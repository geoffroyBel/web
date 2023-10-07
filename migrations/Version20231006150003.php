<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231006150003 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE abonnement DROP FOREIGN KEY FK_351268BB9E45C554');
        $this->addSql('ALTER TABLE abonnement ADD CONSTRAINT FK_351268BB9E45C554 FOREIGN KEY (prestation_id) REFERENCES prestation (id) ON DELETE SET NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE abonnement DROP FOREIGN KEY FK_351268BB9E45C554');
        $this->addSql('ALTER TABLE abonnement ADD CONSTRAINT FK_351268BB9E45C554 FOREIGN KEY (prestation_id) REFERENCES prestation (id) ON UPDATE NO ACTION ON DELETE CASCADE');
    }
}