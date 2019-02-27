<?php

namespace App\Entity;

class Company
{

    private $id;
    private $name;
    private $catchPhrase;
    private $bs;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id): void
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name): void
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getCatchPhrase()
    {
        return $this->catchPhrase;
    }

    /**
     * @param mixed $catchPhrase
     */
    public function setCatchPhrase($catchPhrase): void
    {
        $this->catchPhrase = $catchPhrase;
    }

    /**
     * @return mixed
     */
    public function getBs()
    {
        return $this->bs;
    }

    /**
     * @param mixed $bs
     */
    public function setBs($bs): void
    {
        $this->bs = $bs;
    }



}
