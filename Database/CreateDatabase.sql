-- Datenbank auswählen
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





-- Tabelle Aufträge erstellen
CREATE TABLE Aufträge (
    AuftragID INT IDENTITY(1,1) PRIMARY KEY,
    KundeID INT NOT NULL FOREIGN KEY REFERENCES Accounts(AccountID),
    Dienstleistung NVARCHAR(50) NOT NULL,
    Priorität TINYINT NOT NULL CHECK (Priorität IN (1, 2, 3)),
    Status NVARCHAR(20) NOT NULL CHECK (Status IN ('Offen', 'InArbeit', 'Abgeschlossen')),
    ErstelltAm DATETIME DEFAULT GETDATE()
);





-- Testdaten für Accounts
INSERT INTO Accounts (Benutzername, PasswortHash, Email, Telefon, Rolle)
VALUES 
('kunde1', 'hashed_password1', 'kunde1@example.com', '123456789', 'Kunde'),
('kunde2', 'hashed_password2', 'kunde2@example.com', '987654321', 'Kunde'),
('mitarbeiter1', 'hashed_password3', 'mitarbeiter1@example.com', '555555555', 'Mitarbeiter');





-- Testdaten für Aufträge
INSERT INTO Aufträge (KundeID, Dienstleistung, Priorität, Status)
VALUES 
(1, 'Kleiner Service', 1, 'Offen'),
(2, 'Heisswachsen', 2, 'InArbeit');