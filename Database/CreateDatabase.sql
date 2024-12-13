-- Datenbank ausw�hlen
USE SkiServiceManagement;





-- Tabelle Accounts erstellen
CREATE TABLE Accounts (
    AccountID INT IDENTITY(1,1) PRIMARY KEY,
    Benutzername NVARCHAR(50) UNIQUE NOT NULL,
    PasswortHash NVARCHAR(255) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Telefon NVARCHAR(20),
    Rolle NVARCHAR(20) NOT NULL CHECK (Rolle IN ('Kunde', 'Mitarbeiter'))
);





-- Tabelle Auftr�ge erstellen
CREATE TABLE Auftr�ge (
    AuftragID INT IDENTITY(1,1) PRIMARY KEY,
    KundeID INT NOT NULL FOREIGN KEY REFERENCES Accounts(AccountID),
    Dienstleistung NVARCHAR(50) NOT NULL,
    Priorit�t TINYINT NOT NULL CHECK (Priorit�t IN (1, 2, 3)),
    Status NVARCHAR(20) NOT NULL CHECK (Status IN ('Offen', 'InArbeit', 'Abgeschlossen')),
    ErstelltAm DATETIME DEFAULT GETDATE()
);





-- Testdaten f�r Accounts
INSERT INTO Accounts (Benutzername, PasswortHash, Email, Telefon, Rolle)
VALUES 
('kunde1', 'hashed_password1', 'kunde1@example.com', '123456789', 'Kunde'),
('kunde2', 'hashed_password2', 'kunde2@example.com', '987654321', 'Kunde'),
('mitarbeiter1', 'hashed_password3', 'mitarbeiter1@example.com', '555555555', 'Mitarbeiter');





-- Testdaten f�r Auftr�ge
INSERT INTO Auftr�ge (KundeID, Dienstleistung, Priorit�t, Status)
VALUES 
(1, 'Kleiner Service', 1, 'Offen'),
(2, 'Heisswachsen', 2, 'InArbeit');