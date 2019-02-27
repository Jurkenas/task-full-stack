<?php

namespace App\Mappers;

use App\Entity\User;
use App\Entity\Address;
use App\Entity\Geo;
use App\Entity\Company;

class UserMapper
{
    public function mapUser($data)
    {
        $geo = new Geo();

        $geo->setLat($data['address']['geo']['lat']);
        $geo->setLng($data['address']['geo']['lng']);

        $address = new Address();

        $address->setStreet($data['address']['street']);
        $address->setSuite($data['address']['suite']);
        $address->setCity($data['address']['city']);
        $address->setZipcode($data['address']['zipcode']);
        $address->setGeo($geo);

        $company = new Company();

        $company->setName($data['company']['name']);
        $company->setCatchPhrase($data['company']['catchPhrase']);
        $company->setBs($data['company']['bs']);

        $user = new User();

        $user->setName($data['name']);
        $user->setUsername($data['username']);
        $user->setEmail($data['email']);
        $user->setAddress($address);
        $user->setPhone($data['phone']);
        $user->setWebsite($data['website']);
        $user->setCompany($company);


        return $user;

    }

    public function mapUserToEdit($data)
    {
        $geo = new Geo();

        $geo->setId($data['address']['geo']['id']);
        $geo->setLat($data['address']['geo']['lat']);
        $geo->setLng($data['address']['geo']['lng']);

        $address = new Address();

        $address->setId($data['address']['id']);
        $address->setStreet($data['address']['street']);
        $address->setSuite($data['address']['suite']);
        $address->setCity($data['address']['city']);
        $address->setZipcode($data['address']['zipcode']);
        $address->setGeo($geo);

        $company = new Company();

        $company->setId($data['company']['id']);
        $company->setName($data['company']['name']);
        $company->setCatchPhrase($data['company']['catchPhrase']);
        $company->setBs($data['company']['bs']);

        $user = new User();

        $user->setId($data['id']);
        $user->setName($data['name']);
        $user->setUsername($data['username']);
        $user->setEmail($data['email']);
        $user->setAddress($address);
        $user->setPhone($data['phone']);
        $user->setWebsite($data['website']);
        $user->setCompany($company);


        return $user;

    }
}