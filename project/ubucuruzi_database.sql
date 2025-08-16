-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2025 at 08:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ubucuruzi_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `abakiriya`
--

CREATE TABLE `abakiriya` (
  `id` int(11) NOT NULL,
  `amazina` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefoni` varchar(20) DEFAULT NULL,
  `aderesi` text DEFAULT NULL,
  `ubucuruzi_id` int(11) NOT NULL,
  `byaremwe` timestamp NOT NULL DEFAULT current_timestamp(),
  `byavuguruwe` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `abakoresha`
--

CREATE TABLE `abakoresha` (
  `id` int(11) NOT NULL,
  `amazina` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefoni` varchar(20) NOT NULL,
  `ijambobanga` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `ifoto` varchar(500) DEFAULT NULL,
  `ubucuruzi_id` int(11) DEFAULT NULL,
  `ussd_pin` varchar(6) DEFAULT NULL,
  `byemejwe` tinyint(1) DEFAULT 0,
  `byaremwe` timestamp NOT NULL DEFAULT current_timestamp(),
  `byavuguruwe` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `amafaranga_yasohotse`
--

CREATE TABLE `amafaranga_yasohotse` (
  `id` int(11) NOT NULL,
  `icyiciro` varchar(100) NOT NULL,
  `ibisobanuro` text NOT NULL,
  `amafaranga` decimal(15,2) NOT NULL,
  `itariki` date NOT NULL,
  `uburyo_kwishyura` int(11) NOT NULL,
  `umukoresha_id` int(11) NOT NULL,
  `ubucuruzi_id` int(11) NOT NULL,
  `byaremwe` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `amakuru`
--

CREATE TABLE `amakuru` (
  `id` int(11) NOT NULL,
  `umutwe` varchar(255) NOT NULL,
  `ubutumwa` text NOT NULL,
  `ubwoko` int(11) DEFAULT 1,
  `akamaro` int(11) DEFAULT 2,
  `byasomwe` tinyint(1) DEFAULT 0,
  `umukoresha_id` int(11) DEFAULT NULL,
  `ubucuruzi_id` int(11) NOT NULL,
  `byaremwe` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ibicuruzwa`
--

CREATE TABLE `ibicuruzwa` (
  `id` int(11) NOT NULL,
  `izina` varchar(255) NOT NULL,
  `icyiciro` varchar(100) NOT NULL,
  `kode` varchar(50) NOT NULL,
  `igiciro_kugura` decimal(15,2) NOT NULL,
  `igiciro_kugurisha` decimal(15,2) NOT NULL,
  `umubare` int(11) NOT NULL DEFAULT 0,
  `ibisobanuro` text DEFAULT NULL,
  `uwatanga` varchar(255) DEFAULT NULL,
  `ifoto` varchar(500) DEFAULT NULL,
  `ubucuruzi_id` int(11) NOT NULL,
  `byaremwe` timestamp NOT NULL DEFAULT current_timestamp(),
  `byavuguruwe` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ibikorwa`
--

CREATE TABLE `ibikorwa` (
  `id` int(11) NOT NULL,
  `ubwoko` varchar(20) NOT NULL CHECK (`ubwoko` in ('igurisha','kugura')),
  `icyicuruzwa_id` int(11) NOT NULL,
  `umubare` int(11) NOT NULL,
  `igiciro_kimwe` decimal(15,2) NOT NULL,
  `igiciro_cyose` decimal(15,2) GENERATED ALWAYS AS (`umubare` * `igiciro_kimwe`) STORED,
  `izina_umukiriya` varchar(255) DEFAULT NULL,
  `izina_uwatanga` varchar(255) DEFAULT NULL,
  `itariki` date NOT NULL,
  `inyandiko` text DEFAULT NULL,
  `uburyo_kwishyura` int(11) DEFAULT 1,
  `umukoresha_id` int(11) NOT NULL,
  `ubucuruzi_id` int(11) NOT NULL,
  `byaremwe` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification_types`
--

CREATE TABLE `notification_types` (
  `id` int(11) NOT NULL,
  `izina` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification_types`
--

INSERT INTO `notification_types` (`id`, `izina`) VALUES
(1, 'amakuru'),
(3, 'iburira'),
(4, 'ikosa'),
(2, 'intsinzi');

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` int(11) NOT NULL,
  `izina` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `izina`) VALUES
(1, 'amafaranga'),
(2, 'banki'),
(3, 'mobile_money'),
(4, 'ussd');

-- --------------------------------------------------------

--
-- Table structure for table `priority_levels`
--

CREATE TABLE `priority_levels` (
  `id` int(11) NOT NULL,
  `izina` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `priority_levels`
--

INSERT INTO `priority_levels` (`id`, `izina`) VALUES
(3, 'gikomeye'),
(2, 'gisanzwe'),
(1, 'gito');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `izina` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `izina`) VALUES
(3, 'umukoresha'),
(2, 'umukozi'),
(1, 'umuyobozi');

-- --------------------------------------------------------

--
-- Table structure for table `ubucuruzi`
--

CREATE TABLE `ubucuruzi` (
  `id` int(11) NOT NULL,
  `izina` varchar(255) NOT NULL,
  `ubwoko` varchar(100) NOT NULL,
  `ifaranga` varchar(10) DEFAULT 'RWF',
  `aderesi` text DEFAULT NULL,
  `numero_yumusanzu` varchar(50) DEFAULT NULL,
  `telefoni` varchar(20) DEFAULT NULL,
  `ussd_kode` varchar(10) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `byaremwe` timestamp NOT NULL DEFAULT current_timestamp(),
  `byavuguruwe` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ussd_sessions`
--

CREATE TABLE `ussd_sessions` (
  `id` int(11) NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `telefoni` varchar(20) NOT NULL,
  `icyiciro` varchar(50) NOT NULL,
  `amakuru` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`amakuru`)),
  `byaremwe` timestamp NOT NULL DEFAULT current_timestamp(),
  `byavuguruwe` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `abakiriya`
--
ALTER TABLE `abakiriya`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ubucuruzi_id` (`ubucuruzi_id`),
  ADD KEY `idx_telefoni` (`telefoni`);

--
-- Indexes for table `abakoresha`
--
ALTER TABLE `abakoresha`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `telefoni` (`telefoni`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `ubucuruzi_id` (`ubucuruzi_id`);

--
-- Indexes for table `amafaranga_yasohotse`
--
ALTER TABLE `amafaranga_yasohotse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `umukoresha_id` (`umukoresha_id`),
  ADD KEY `ubucuruzi_id` (`ubucuruzi_id`),
  ADD KEY `uburyo_kwishyura` (`uburyo_kwishyura`),
  ADD KEY `idx_itariki` (`itariki`),
  ADD KEY `idx_icyiciro` (`icyiciro`);

--
-- Indexes for table `amakuru`
--
ALTER TABLE `amakuru`
  ADD PRIMARY KEY (`id`),
  ADD KEY `umukoresha_id` (`umukoresha_id`),
  ADD KEY `ubucuruzi_id` (`ubucuruzi_id`),
  ADD KEY `ubwoko` (`ubwoko`),
  ADD KEY `akamaro` (`akamaro`),
  ADD KEY `idx_byasomwe` (`byasomwe`);

--
-- Indexes for table `ibicuruzwa`
--
ALTER TABLE `ibicuruzwa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_kode_ubucuruzi` (`kode`,`ubucuruzi_id`),
  ADD KEY `ubucuruzi_id` (`ubucuruzi_id`);

--
-- Indexes for table `ibikorwa`
--
ALTER TABLE `ibikorwa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `icyicuruzwa_id` (`icyicuruzwa_id`),
  ADD KEY `umukoresha_id` (`umukoresha_id`),
  ADD KEY `ubucuruzi_id` (`ubucuruzi_id`),
  ADD KEY `uburyo_kwishyura` (`uburyo_kwishyura`),
  ADD KEY `idx_itariki` (`itariki`),
  ADD KEY `idx_ubwoko` (`ubwoko`);

--
-- Indexes for table `notification_types`
--
ALTER TABLE `notification_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `izina` (`izina`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `izina` (`izina`);

--
-- Indexes for table `priority_levels`
--
ALTER TABLE `priority_levels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `izina` (`izina`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `izina` (`izina`);

--
-- Indexes for table `ubucuruzi`
--
ALTER TABLE `ubucuruzi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ussd_kode` (`ussd_kode`);

--
-- Indexes for table `ussd_sessions`
--
ALTER TABLE `ussd_sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_id` (`session_id`),
  ADD KEY `idx_session_id` (`session_id`),
  ADD KEY `idx_telefoni` (`telefoni`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `abakiriya`
--
ALTER TABLE `abakiriya`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `abakoresha`
--
ALTER TABLE `abakoresha`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `amafaranga_yasohotse`
--
ALTER TABLE `amafaranga_yasohotse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `amakuru`
--
ALTER TABLE `amakuru`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ibicuruzwa`
--
ALTER TABLE `ibicuruzwa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ibikorwa`
--
ALTER TABLE `ibikorwa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification_types`
--
ALTER TABLE `notification_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `priority_levels`
--
ALTER TABLE `priority_levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ubucuruzi`
--
ALTER TABLE `ubucuruzi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ussd_sessions`
--
ALTER TABLE `ussd_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `abakiriya`
--
ALTER TABLE `abakiriya`
  ADD CONSTRAINT `abakiriya_ibfk_1` FOREIGN KEY (`ubucuruzi_id`) REFERENCES `ubucuruzi` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `abakoresha`
--
ALTER TABLE `abakoresha`
  ADD CONSTRAINT `abakoresha_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `abakoresha_ibfk_2` FOREIGN KEY (`ubucuruzi_id`) REFERENCES `ubucuruzi` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `amafaranga_yasohotse`
--
ALTER TABLE `amafaranga_yasohotse`
  ADD CONSTRAINT `amafaranga_yasohotse_ibfk_1` FOREIGN KEY (`umukoresha_id`) REFERENCES `abakoresha` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `amafaranga_yasohotse_ibfk_2` FOREIGN KEY (`ubucuruzi_id`) REFERENCES `ubucuruzi` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `amafaranga_yasohotse_ibfk_3` FOREIGN KEY (`uburyo_kwishyura`) REFERENCES `payment_methods` (`id`);

--
-- Constraints for table `amakuru`
--
ALTER TABLE `amakuru`
  ADD CONSTRAINT `amakuru_ibfk_1` FOREIGN KEY (`umukoresha_id`) REFERENCES `abakoresha` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `amakuru_ibfk_2` FOREIGN KEY (`ubucuruzi_id`) REFERENCES `ubucuruzi` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `amakuru_ibfk_3` FOREIGN KEY (`ubwoko`) REFERENCES `notification_types` (`id`),
  ADD CONSTRAINT `amakuru_ibfk_4` FOREIGN KEY (`akamaro`) REFERENCES `priority_levels` (`id`);

--
-- Constraints for table `ibicuruzwa`
--
ALTER TABLE `ibicuruzwa`
  ADD CONSTRAINT `ibicuruzwa_ibfk_1` FOREIGN KEY (`ubucuruzi_id`) REFERENCES `ubucuruzi` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ibikorwa`
--
ALTER TABLE `ibikorwa`
  ADD CONSTRAINT `ibikorwa_ibfk_1` FOREIGN KEY (`icyicuruzwa_id`) REFERENCES `ibicuruzwa` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ibikorwa_ibfk_2` FOREIGN KEY (`umukoresha_id`) REFERENCES `abakoresha` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ibikorwa_ibfk_3` FOREIGN KEY (`ubucuruzi_id`) REFERENCES `ubucuruzi` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ibikorwa_ibfk_4` FOREIGN KEY (`uburyo_kwishyura`) REFERENCES `payment_methods` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
