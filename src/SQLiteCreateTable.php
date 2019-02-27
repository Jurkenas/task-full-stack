<?php

namespace App;

class SQLiteCreateTable {

    /**
     * PDO object
     * @var \PDO
     */
    private $pdo;

    /**
     * connect to the SQLite database
     */
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    /**
     * create tables
     */
    public function createTables()
    {
        $commands = ['CREATE TABLE IF NOT EXISTS users (
                        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name VARCHAR (100),
                        username VARCHAR (100) NOT NULL,
                        email VARCHAR (100) NOT NULL,
                        phone VARCHAR (50),
                        website VARCHAR (100),
                        address_id INTEGER,
                        company_id INTEGER,
                        FOREIGN KEY (address_id) REFERENCES addresses(address_id),
                        FOREIGN KEY (company_id) REFERENCES companies(company_id)
                      )',
            'CREATE TABLE IF NOT EXISTS addresses (
                    address_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    street  VARCHAR (255),
                    suite  VARCHAR (255),
                    city VARCHAR (255),
                    zipcode VARCHAR (255),
                    geo_id INTEGER ,
                    FOREIGN KEY (geo_id) REFERENCES geo(geo_id))',
            'CREATE TABLE IF NOT EXISTS geo(
                    geo_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    lat VARCHAR (10),
                    lng VARCHAR (10))',
            'CREATE TABLE IF NOT EXISTS companies(
                    company_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name VARCHAR (255),
                    catchPhrase VARCHAR (255),
                    bs VARCHAR (255))'];
        // execute the sql commands to create new tables
        foreach ($commands as $command) {
            $this->pdo->exec($command);
        }
    }
    /**
     * get the table list in the database
     */
    public function getTableList() {

        $stmt = $this->pdo->query("SELECT name
                                   FROM sqlite_master
                                   WHERE type = 'table'
                                   ORDER BY name");
        $tables = [];
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $tables[] = $row['name'];
        }

        return $tables;
    }

}