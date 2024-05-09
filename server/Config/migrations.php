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
        $responseResetQuery = $connection->prepare("DROP TABLE IF EXISTS response");
        $statement = $responseResetQuery->execute();
        $ticketResetQuery = $connection->prepare("DROP TABLE IF EXISTS tickets");
        $statement = $ticketResetQuery->execute();
        $userResetQuery = $connection->prepare("DROP TABLE IF EXISTS users;");
        $statement = $userResetQuery->execute();

        //////////////////
        ///USER SCHEMA///
        ////////////////

        $userSchemaQuery = "
        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(150) UNIQUE NOT NULL,
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
        priority VARCHAR(5) DEFAULT 'low',
        user_id int REFERENCES users(id)
        );
        ";
        $statement = $connection->prepare($ticketSchemaQuery);
        $statement->execute();
        ///////////////////
        ///Response SCHEMA///
        //////////////////

        $responseQuery = "
        CREATE TABLE response(
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL,
            sender_id int REFERENCES users(id),
            ticket_id  int REFERENCES tickets(id)
        );
        ";
        $statement = $connection->prepare($responseQuery);
        $statement->execute();

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