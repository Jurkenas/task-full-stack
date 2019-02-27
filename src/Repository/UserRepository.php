<?php

namespace App\Repository;

use App\Entity\Address;
use App\Entity\Company;
use App\Entity\User;
use App\Entity\Geo;

class UserRepository{

    /**
     * PDO object
     * @var \PDO
     */
    private $pdo;

    /**
     * Initialize the object with a specified PDO object
     * @param \PDO $pdo
     */
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function addUser(User $user) {

        $address_id = $this->addAddress($user->getAddress());
        $company_id = $this->addCompany($user->getCompany());

        $sql = 'INSERT INTO users( name, username, email, phone, website, address_id, company_id) '
            . 'VALUES(:name,:username,:email,:phone,:website,:address_id,:company_id)';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':name' => $user->getName(),
            ':username' => $user->getUsername(),
            ':email' => $user->getEmail(),
            ':phone' => $user->getPhone(),
            ':website' => $user->getWebsite(),
            ':address_id' => $address_id,
            ':company_id' => $company_id
        ]);

        return $this->pdo->lastInsertId();
    }

    public function addGeo(Geo $geo) {

        $sql = 'INSERT INTO geo(lat, lng) '
            . 'VALUES(:lat,:lng)';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':lat' => $geo->getLat(),
            ':lng' => $geo->getLng()
        ]);
        return $this->pdo->lastInsertId();
    }

    public function addAddress(Address $address) {

        $geo_id = $this->addGeo($address->getGeo());

        $sql = 'INSERT INTO addresses(street, suite, city, zipcode, geo_id) '
            . 'VALUES(:street,:suite,:city,:zipcode,:geo_id)';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':street' => $address->getStreet(),
            ':suite' => $address->getSuite(),
            ':city' => $address->getCity(),
            ':zipcode' => $address->getZipcode(),
            ':geo_id' => $geo_id
        ]);

        return $this->pdo->lastInsertId();
    }

    public function addCompany(Company $company) {

        $sql = 'INSERT INTO companies(name, catchPhrase, bs) '
            . 'VALUES(:name,:catchPhrase,:bs)';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':name' => $company->getName(),
            ':catchPhrase' => $company->getCatchPhrase(),
            ':bs' => $company->getBs()
        ]);

        return $this->pdo->lastInsertId();
    }


    public function editUser(User $user) {


        $sql = 'UPDATE users SET name = :name, username = :username, email = :email, phone = :phone, website = :website'
        . ' WHERE user_id = :user_id';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':name' => $user->getName(),
            ':username' => $user->getUsername(),
            ':email' => $user->getEmail(),
            ':phone' => $user->getPhone(),
            ':website' => $user->getWebsite(),
            ':user_id' => $user->getId()
        ]);

        $this->editAddress($user->getAddress());
        $this->editCompany($user->getCompany());

        return $this->pdo->lastInsertId();
    }

    public function editAddress(Address $address) {


        $sql = 'UPDATE addresses SET street = :street, suite = :suite, city = :city, zipcode = :zipcode'
            .' WHERE address_id = :address_id';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':street' => $address->getStreet(),
            ':suite' => $address->getSuite(),
            ':city' => $address->getCity(),
            ':zipcode' => $address->getZipcode(),
            ':address_id' => $address->getId()
        ]);

        $this->editGeo($address->getGeo());

        return $this->pdo->lastInsertId();
    }

    public function editGeo(Geo $geo) {


        $sql = 'UPDATE geo SET lat = :lat, lng = :lng'
            . ' WHERE geo_id = :geo_id';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':lat' => $geo->getLat(),
            ':lng' => $geo->getLng(),
            ':geo_id' => $geo->getId()
        ]);

        return $this->pdo->lastInsertId();
    }

    public function editCompany(Company $company) {

        $sql = 'UPDATE companies SET name = :name, catchPhrase = :catchPhrase, bs = :bs'
            . ' WHERE company_id = :company_id';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':name' => $company->getName(),
            ':catchPhrase' => $company->getCatchPhrase(),
            ':bs' => $company->getBs(),
            ':company_id' => $company->getId()
        ]);

        return $this->pdo->lastInsertId();
    }



    public function deleteUser($id) {

        $sql = 'DELETE FROM users '
            . 'WHERE user_id = :id';

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':id', $id);

        $stmt->execute();

        return $stmt->rowCount();
    }


}