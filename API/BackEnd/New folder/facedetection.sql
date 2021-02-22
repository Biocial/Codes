-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2021 at 12:50 PM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `facedetection`
--

-- --------------------------------------------------------

--
-- Table structure for table `a1004`
--

CREATE TABLE `a1004` (
  `id` varchar(100) NOT NULL,
  `vertices` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `a1004`
--

INSERT INTO `a1004` (`id`, `vertices`) VALUES
('a1004', 'asdf;lsadf');

-- --------------------------------------------------------

--
-- Table structure for table `faceencodings`
--

CREATE TABLE `faceencodings` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `frequency` varchar(100) NOT NULL,
  `signup_date` varchar(100) NOT NULL,
  `login_date` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `faceencodings`
--

INSERT INTO `faceencodings` (`id`, `name`, `frequency`, `signup_date`, `login_date`, `status`) VALUES
('a1001', 'abc', '6', '2021-01-30', '31-01-2021', ''),
('a1002', 'abcabc', '6', '2021-01-30', '31-01-2021', ''),
('a1003', 'abc', '13', '2021-01-29', '31-01-2021', ''),
('a1004', 'abcabc', '13', '2021-01-29', '31-01-2021', '');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `date`, `status`) VALUES
('a1001', '2021-01-30', ''),
('a1002', '2021-01-30', ''),
('a1003', '2021-01-31', ''),
('a1003', '2021-01-30', ''),
('a1004', '2021-01-31', ''),
('a1004', '2021-01-30', '');

-- --------------------------------------------------------

--
-- Table structure for table `temptableencodings`
--

CREATE TABLE `temptableencodings` (
  `id` varchar(100) NOT NULL,
  `vertices` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `temptableid`
--

CREATE TABLE `temptableid` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
