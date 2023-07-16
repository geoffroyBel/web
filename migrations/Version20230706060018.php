<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230706060018 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation ADD horaire_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C8495558C54515 FOREIGN KEY (horaire_id) REFERENCES horaire (id)');
        $this->addSql('CREATE INDEX IDX_42C8495558C54515 ON reservation (horaire_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C8495558C54515');
        $this->addSql('DROP INDEX IDX_42C8495558C54515 ON reservation');
        $this->addSql('ALTER TABLE reservation DROP horaire_id');
    }
}
