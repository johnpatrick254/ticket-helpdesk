<?php
use App\Models\ResponseModel;
use App\Models\TicketModel;

require dirname(__DIR__) . '/vendor/autoload.php';
use App\Config\Database;
use App\Models\UserModel;


function runSeeder()
{
    $faker = Faker\Factory::create();
    $db = Database::getDatabaseInstance();
    $connection = $db->getDatabaseConnection();
    try {
        //RESET SCHEMAS
        $connection->beginTransaction();
        $responseResetQuery = $connection->prepare('DELETE FROM responses');
        $responseResetQuery->execute();
        $ticketResetQuery = $connection->prepare('DELETE FROM tickets');
        $ticketResetQuery->execute();
        $usersResetQuery = $connection->prepare('DELETE FROM users');
        $usersResetQuery->execute();
        $connection->commit();


        //CREATE USERS

        $users = [];
        for ($x = 0; $x < 200; $x++) {
            $first_name = $faker->firstName();
            $last_name = $faker->lastName();
            $email = $faker->email();
            $password = '1234';
            $role = 'user';
            if ($x % 2 == 0) {
                $role = 'support';
            }

            $user = new UserModel($first_name, $last_name, $email, $password, $role);
            $user->save();

            $users[] = $user;
        }

        //CREATE TICKETS
        foreach ($users as $user) {
            if ($user->role !== 'support') {
                $totalTickets = random_int(1, 30);
                for ($x = 0; $x < $totalTickets; $x++) {
                    $title = ucwords($faker->catchPhrase . ' ' . $faker->bs);
                    $body = $faker->words(random_int(2, 6), true);
                    $priority = ['low', 'high'][random_int(0, 1)];
                    $user_id = $user->id;
                    $ticket = new TicketModel($title, $body, $priority, $user_id);
                    $ticket->save();
                    var_dump($ticket);
                    //CREATE RESPONSES
                    $totalResponses =random_int(7, 15);
                    for ($y = 0; $y < $totalResponses; $y++) {
                        $content = $faker->words(random_int(1, 4),true);
                        $user_id = random_int(1, 200);
                        if ($user_id % 2 !== 0) {
                            $user_id = $user->id;
                        }
                        $ticket_id = $ticket->id;
                    }
                    $response = new ResponseModel($content, $user_id, $ticket_id);
                    $response->save();

                }

            }
        }
  echo "\n\n SEED WAS SUCCESSFULL \n\n";
    } catch (PDOException $e) {
        $connection->rollBack();
        die(json_encode(['error' => "error running seeder: " + $e->getMessage()]));

    }
}

runSeeder();