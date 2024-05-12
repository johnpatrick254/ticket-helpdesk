<?php
require dirname(__DIR__) . '/vendor/autoload.php';
use App\Config\Database;

function runMigration()
{
    $db = Database::getDatabaseInstance();
    $connection = $db->getDatabaseConnection();
    //START MIGRATION TRANSACTION
    $connection->beginTransaction();
    try {
        //CLEAR SCHEMA IF IT EXISTS
        $responseResetQuery = $connection->prepare("DROP TABLE IF EXISTS responses");
        $statement = $responseResetQuery->execute();
        $ticketResetQuery = $connection->prepare("DROP TABLE IF EXISTS tickets");
        $statement = $ticketResetQuery->execute();
        $userResetQuery = $connection->prepare("DROP TABLE IF EXISTS users;");
        $statement = $userResetQuery->execute();

        //FUNCTIONS 
        $triggerTicketSetTimeStamp = $connection->prepare("
       CREATE OR REPLACE FUNCTION trigger_set_timestamp()
       RETURNS TRIGGER AS $$
       BEGIN
        NEW.last_updated = Now();
        IF NEW.priority = 'completed' THEN
        NEW.completed_at = Now();
        END IF; 
        RETURN NEW;
       END;
       $$ LANGUAGE plpgsql;
       ")->execute();

        $triggerResponseSetTimeStamp = $connection->prepare("
       CREATE OR REPLACE FUNCTION trigger_response_set_timestamp()
       RETURNS TRIGGER AS $$
       BEGIN
        UPDATE tickets
        SET last_updated = Now()
        WHERE id = NEW.ticket_id;
        RETURN NEW;
       END;
       $$ LANGUAGE plpgsql;
       ")->execute();

        //////////////////
        ///USER SCHEMA///
        ////////////////

        $userSchemaQuery = "
        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(150) UNIQUE NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        password VARCHAR(50) NOT NULL,
        role VARCHAR(50) DEFAULT 'user'
        );
        ";

        $statement = $connection->prepare($userSchemaQuery);
        $statement->execute();

        ///////////////////
        ///Ticket SCHEMA///
        //////////////////

        $ticketSchemaQuery = "
        CREATE TABLE tickets(
        id SERIAL PRIMARY KEY,
        title VARCHAR(300) NOT NULL,
        body  TEXT NOT NULL,
        priority VARCHAR(10) DEFAULT 'low',
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        date_created TIMESTAMP DEFAULT NOW(),
        last_updated TIMESTAMP DEFAULT NOW(),
        completed_at TIMESTAMP 
        );
        ";
        $statement = $connection->prepare($ticketSchemaQuery);
        $statement->execute();

        //Ticket Trigger

        $ticketTrigger = $connection->prepare("
        CREATE TRIGGER set_timestamps
        BEFORE UPDATE ON tickets
        FOR EACH ROW
        EXECUTE PROCEDURE  trigger_set_timestamp();
        ")->execute();

        ///////////////////
        ///Response SCHEMA///
        //////////////////

        $responseQuery = "
        CREATE TABLE responses(
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL,
            sender_id INT REFERENCES users(id) ON DELETE CASCADE,
            ticket_id  INT REFERENCES tickets(id) ON DELETE CASCADE,
            date_created TIMESTAMP DEFAULT NOW()
        );
        ";
        $statement = $connection->prepare($responseQuery);
        $statement->execute();

        //Response Trigger

        $responseTrigger = $connection->prepare('
        CREATE TRIGGER set_response_last_updated
        BEFORE UPDATE ON responses
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_response_set_timestamp();
        ')->execute();

        //COMMIT TRANSACTION AND END MIGRATION
        $connection->commit();
        $statement->closeCursor();
        echo "migration succesfull";
    } catch (PDOException $e) {
        echo "migration failed: " . $e->getMessage();
        $connection->rollBack();
    }

}

runMigration();