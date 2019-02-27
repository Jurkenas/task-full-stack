<?php
namespace App\Controller;

use App\Mappers\UserMapper;
use App\Repository\UserRepository;
use App\SQLiteConnection;
use App\Entity\User;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends AbstractController
{


    /**
     * @Route("/user", methods="POST")
     */
    public function userAdd(Request $request)
    {
        $response = new Response();
        $UserMapper = new UserMapper();

        $data = json_decode($request->getContent(), true);

        $user = $UserMapper->mapUser($data['res']);

        $pdo = (new SQLiteConnection())->connect();

        $UserRepository = new UserRepository($pdo);

        $lastID = $UserRepository->addUser($user);

        $response->setContent(json_encode([
            'user_id' => $lastID
        ]));

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;

    }

    /**
     * @Route("/user/edit", methods="PUT")
     */
    public function userEdit(Request $request)
    {
        $response = new Response();
        $UserMapper = new UserMapper();

        $data = $request->getContent();

        $result = json_decode($data, true);

        $user = $UserMapper->mapUserToEdit($result['res']);

        $pdo = (new SQLiteConnection())->connect();

        $UserRepository = new UserRepository($pdo);

        $lastID = $UserRepository->editUser($user);

        $response->setContent(json_encode([
            'user_id' => $lastID
        ]));

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;

    }

    /**
     * @Route("/user/list", methods="GET")
     */
    public function getUsers()
    {
        $response = new Response();

        $pdo = (new SQLiteConnection())->connect();

        $result = $pdo->query('SELECT user_id, name, phone, email FROM users');
        $users = [];
        foreach($result as $row){
            $users[] = [
                'id' => $row['user_id'],
                'name' => $row['name'],
                'email' => $row['email'],
                'phone' => $row['phone']
            ];
        }

        $response->setContent(json_encode([
            'users' => $users
        ]));

        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }

    /**
     * @Route("/user/get/{id}", methods="GET")
     */
    public function getUserData($id)
    {
        $response = new Response();

        $pdo = (new SQLiteConnection())->connect();


        $stmt = $pdo->prepare('SELECT * 
                                    FROM users
                                   WHERE user_id = :user_id;');
        $stmt->bindParam(':user_id', $id);
        $stmt->execute();
        $res = $stmt->fetchObject();

        $address_id = $res->address_id;
        $address = $this->getAddressData($address_id);


        $company_id = $res->company_id;
        $company = $this->getCompanyData($company_id);

        $response->setContent(json_encode([
            'users' => $res,
            'address' => $address['address'],
            'geo' => $address['geo'],
            'company' => $company
        ]));

        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }

    public function getAddressData($id)
    {
        $pdo = (new SQLiteConnection())->connect();

        $stmt = $pdo->prepare('SELECT * 
                                    FROM addresses
                                   WHERE address_id = :address_id;');
        $stmt->bindParam(':address_id', $id);
        $stmt->execute();
        $res = $stmt->fetchObject();


        $geo_id = $res->geo_id;
        $geo = $this->getGeoData($geo_id);

        $result = array(
            'address'  => $res,
            'geo' => $geo
        );

        return $result;
    }

    public function getGeoData($id)
    {
        $pdo = (new SQLiteConnection())->connect();

        $stmt = $pdo->prepare('SELECT * 
                                    FROM geo
                                   WHERE geo_id = :geo_id;');
        $stmt->bindParam(':geo_id', $id);
        $stmt->execute();
        $res = $stmt->fetchObject();

        return $res;
    }

    public function getCompanyData($id)
    {
        $pdo = (new SQLiteConnection())->connect();

        $stmt = $pdo->prepare('SELECT * 
                                    FROM companies
                                   WHERE company_id = :company_id;');
        $stmt->bindParam(':company_id', $id);
        $stmt->execute();
        $res = $stmt->fetchObject();

        return $res;
    }


    /**
     * @Route("/user/{id}", methods="DELETE")
     */
    public function deleteUserData($id)
    {
            $response = new Response();

            $pdo = (new SQLiteConnection())->connect();
            $UserRepository = new UserRepository($pdo);

            $UserRepository->deleteUser($id);

            $response->headers->set('Access-Control-Allow-Origin', '*');

            return $response;
    }
}