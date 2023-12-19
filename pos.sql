-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 172.17.0.3
-- Generation Time: Dec 19, 2023 at 03:43 AM
-- Server version: 8.1.0
-- PHP Version: 8.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `point_of_sale`
--

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint NOT NULL,
  `amount` double NOT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `transaction_date` datetime(6) DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `customer_give` double NOT NULL,
  `customer_receive` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `amount`, `payment_method`, `status`, `transaction_date`, `order_id`, `customer_give`, `customer_receive`) VALUES
(6, 36.980000000000004, 'Cash', 'Success', '2023-01-06 15:15:19.333000', 13, 40, 3.02),
(7, 3198, 'Cash', 'Success', '2023-02-06 16:07:48.609000', 14, 3198, 0),
(8, 73.99000000000001, 'Cash', 'Success', '2023-03-06 17:26:41.765000', 15, 100, 26.01),
(9, 73.99000000000001, 'Cash', 'Success', '2023-01-06 17:34:58.018000', 16, 150, 76.01),
(10, 11589.97, 'Cash', 'Success', '2023-02-06 19:14:12.653000', 17, 12000, 410.03),
(11, 73.99000000000001, 'Cash', 'Success', '2023-03-06 22:38:06.351000', 18, 80, 6.01),
(12, 32, 'Cash', 'Success', '2023-04-06 23:20:55.998000', 19, 40, 8),
(13, 64, 'Cash', 'Success', '2023-05-07 18:25:44.803000', 20, 65, 1),
(14, 2798, 'Cash', 'Success', '2023-06-07 18:26:20.475000', 21, 2800, 2),
(15, 42.99, 'Cash', 'Success', '2023-07-07 18:33:32.346000', 22, 45, 2.01),
(16, 900, 'Cash', 'Success', '2023-08-07 23:45:04.409000', 23, 1000, 100),
(17, 46, 'Cash', 'Success', '2023-09-11 17:25:49.691000', 24, 50, 4),
(18, 1897, 'Cash', 'Success', '2023-10-11 17:26:23.493000', 25, 2000, 103),
(19, 74.98, 'Cash', 'Success', '2023-11-11 17:26:56.656000', 26, 75, 0.02),
(20, 54.97, 'Cash', 'Success', '2023-12-11 17:28:12.716000', 27, 60, 5.03),
(21, 81.98, 'Cash', 'Success', '2023-01-15 17:54:15.896000', 28, 85, 3.02),
(22, 2499, 'Cash', 'Success', '2023-02-15 17:58:11.726000', 29, 2500, 1),
(23, 37, 'Cash', 'Success', '2023-03-17 14:07:19.643000', 30, 40, 3),
(24, 1025, 'Cash', 'Success', '2023-04-18 11:09:47.917000', 33, 1054, 29),
(25, 915, 'Cash', 'Success', '2023-05-18 11:10:05.326000', 34, 1000, 85),
(26, 1599, 'Cash', 'Success', '2023-06-18 11:10:34.889000', 35, 1600, 1),
(27, 58.99, 'Cash', 'Success', '2023-07-18 11:53:35.761000', 36, 60, 1.01),
(28, 1299, 'Cash', 'Success', '2023-08-18 11:53:53.637000', 37, 1300, 1),
(29, 65.99000000000001, 'Cash', 'Success', '2023-09-20 15:43:33.922000', 38, 70, 4.01),
(30, 900, 'Cash', 'Success', '2023-09-18 15:44:11.495000', 39, 920, 20),
(31, 3198, 'Cash', 'Success', '2023-10-16 15:44:35.069000', 40, 3200, 2),
(32, 30.990000000000002, 'Cash', 'Success', '2023-11-27 15:46:00.481000', 41, 32, 1.01),
(33, 74.98, 'Cash', 'Success', '2023-11-14 15:46:15.120000', 42, 80, 5.02),
(34, 50, 'Cash', 'Success', '2023-12-31 16:04:26.306000', 43, 50, 0),
(35, 1025, 'Cash', 'Success', '2023-12-18 19:04:31.450000', 44, 1200, 175),
(36, 83.99000000000001, 'Cash', 'Success', '2023-12-18 19:05:12.613000', 45, 90, 6.01),
(37, 900, 'Cash', 'Success', '2023-12-18 19:05:29.736000', 46, 900, 0),
(38, 1599, 'Cash', 'Success', '2023-12-18 19:06:22.772000', 47, 1632, 33),
(39, 40, 'Cash', 'Success', '2023-12-19 10:11:41.594000', 48, 42, 2),
(40, 27, 'Cash', 'Success', '2023-12-19 10:12:00.392000', 49, 30, 3),
(41, 100.96000000000001, 'Cash', 'Success', '2023-12-19 10:12:38.166000', 50, 120, 19.04),
(42, 1599, 'Cash', 'Success', '2023-12-19 10:23:44.866000', 51, 1600, 1),
(43, 58.99, 'Cash', 'Success', '2023-12-19 10:23:58.168000', 52, 60, 1.01);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_rthu6t9h3qfej8txljv8msly0` (`order_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `FKfyxndk58yiq2vpn0yd4m09kbt` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
