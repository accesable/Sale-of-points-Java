-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 172.17.0.3
-- Generation Time: Dec 19, 2023 at 03:56 AM
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
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` varchar(255) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `creation_date` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `creation_date`) VALUES
('23e0ef74-1c3a-43a2-9717-145405db8a0b', 'Clothing', '2023-12-05 11:34:56.017000'),
('3f6db2c2-5272-4215-b352-861e318c5888', 'Suppliments', '2023-12-01 14:18:48.362000'),
('4c1d382f-0e22-4d80-81a8-ce063dc98251', 'Electrical', '2023-12-02 11:39:43.641000'),
('4fd911fd-4c4e-4349-8029-01f4f5a468e8', 'Electrical Usage', '2023-12-02 11:40:06.923000'),
('507693a9-ba9d-47b4-86b6-139553b39334', 'Techonology', '2023-12-01 14:18:34.248000'),
('a4b6b65a-82d8-4f0e-99c3-d4895fb79f10', 'Books', '2023-12-01 14:18:58.607000'),
('f553def4-00d0-4144-beb2-c27aa863fc40', 'Jewelry', '2023-12-05 21:47:04.602000');

-- --------------------------------------------------------

--
-- Table structure for table `confirmation_token`
--

CREATE TABLE `confirmation_token` (
  `id` bigint NOT NULL,
  `confirmed_at` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `expires_at` datetime(6) NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` bigint NOT NULL,
  `is_loginable` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `confirmation_token`
--

INSERT INTO `confirmation_token` (`id`, `confirmed_at`, `created_at`, `expires_at`, `token`, `user_id`, `is_loginable`) VALUES
(2, '2023-12-02 13:33:39.851439', '2023-12-02 13:33:25.325396', '2023-12-02 13:34:25.325919', 'fd4a1abf-c789-4baf-8cf2-31cb455ab568', 3, b'0'),
(3, NULL, '2023-12-07 09:45:16.752050', '2023-12-07 09:46:16.752050', 'ce552154-9cab-435d-899b-e0c622a2e4db', 4, b'0'),
(4, '2023-12-07 12:18:33.115423', '2023-12-07 12:17:54.046448', '2023-06-21 12:18:54.046448', '6110eed2-7df1-4fb2-90fb-283186866cfe', 5, b'0'),
(5, '2023-12-07 18:23:57.487525', '2023-12-07 18:23:23.283131', '2023-12-07 18:24:23.283131', '1688a23d-9937-4d4d-834a-ef5b377307c3', 6, b'0'),
(6, '2023-12-07 18:57:37.108709', '2023-12-07 18:57:04.736781', '2023-08-22 18:58:04.736781', '99e4bbb7-a4e5-4d92-b0b1-0703dc814e10', 6, b'0'),
(7, '2023-12-07 19:12:08.333469', '2023-12-07 19:11:36.472032', '2023-12-07 19:12:36.472032', 'cdc22e43-0a57-47c4-8e0f-41dfa4028fc4', 3, b'0'),
(8, NULL, '2023-12-07 19:35:17.856482', '2023-07-18 19:36:17.856482', 'b950064e-bfa9-4abe-b6e1-a171ae4bcb17', 7, b'0'),
(9, '2023-12-08 09:18:39.524983', '2023-12-08 09:18:07.913066', '2023-12-08 09:19:07.913066', '5081817a-05d8-47c8-8704-d0988e19deed', 3, b'0'),
(10, '2023-12-08 09:22:17.679014', '2023-12-08 09:21:47.458197', '2023-12-08 09:22:47.458197', '6567954a-d3a5-49a2-8a53-dc5d04ae6df7', 3, b'0'),
(11, '2023-12-08 09:24:39.710147', '2023-12-08 09:24:11.874964', '2023-12-08 09:25:11.874964', '0af7cab0-5769-4009-96b5-7dd7a07e4829', 3, b'0'),
(12, NULL, '2023-12-08 10:23:42.491737', '2023-12-08 10:24:42.491737', 'a33ac523-6a20-4b88-b903-1b7271dd8f16', 3, b'0'),
(13, NULL, '2023-12-08 11:14:13.433612', '2023-09-18 11:15:13.433612', '6015de1a-ebfd-4c6b-8abe-5130a22a8a40', 3, b'0'),
(14, NULL, '2023-12-08 11:15:05.473299', '2023-12-08 11:16:05.473299', '8b7ae683-ed52-4514-88c7-71614069b095', 3, b'0'),
(15, '2023-12-08 11:19:46.459879', '2023-12-08 11:19:10.213746', '2023-12-08 11:20:10.213746', '6efb21df-906d-4bcc-8700-77420f725777', 3, b'0'),
(16, '2023-12-08 11:27:39.828614', '2023-12-08 11:27:06.647248', '2023-12-08 11:28:06.647248', '1ae4403e-5154-48f7-94f3-506344390360', 3, b'0'),
(17, '2023-12-08 11:29:49.017112', '2023-12-08 11:29:15.926883', '2023-12-08 11:30:15.927405', 'b24b4a43-c5b0-416b-b538-c45ef84e846b', 3, b'0'),
(18, '2023-12-08 11:34:48.180941', '2023-12-08 11:34:14.503008', '2023-12-08 11:35:14.503008', '43085083-0bd2-4a48-bd99-d7defbca22f7', 3, b'0'),
(19, '2023-12-08 11:43:28.134339', '2023-12-08 11:42:53.968460', '2023-12-08 11:43:53.968460', '1f8e2640-5ad3-40b7-ba53-207d961d4f72', 3, b'0'),
(20, '2023-12-08 11:45:02.743743', '2023-12-08 11:44:29.141676', '2023-12-08 11:45:29.142197', '3cc9d94a-424b-424f-a608-bede4405bf74', 3, b'0'),
(21, '2023-12-08 11:48:22.975613', '2023-12-08 11:47:49.364329', '2023-12-08 11:48:49.364329', 'db25b17a-6012-40e0-86c1-79828cd2cd4a', 3, b'0'),
(22, '2023-12-08 12:00:32.959264', '2023-12-08 12:00:21.721389', '2023-12-08 12:01:21.721389', '0055e9ee-7cb9-469f-bc02-b4734bbcb583', 3, b'0'),
(23, '2023-12-08 12:09:44.689959', '2023-12-08 12:09:32.053002', '2023-09-20 00:00:00.000000', '63f7e3b8-5130-495b-b5a4-8991f4dc660b', 3, b'0'),
(24, '2023-12-08 12:12:44.013081', '2023-12-08 12:12:34.159231', '2023-12-08 12:13:34.159231', '017e9755-a19a-45f6-aebb-9a1440b7e84f', 3, b'0'),
(25, '2023-12-08 12:17:36.869989', '2023-12-08 12:17:26.912986', '2023-12-08 12:18:26.912986', 'b631bd37-0119-4c45-b909-13d66c2d6d65', 3, b'0'),
(26, '2023-12-08 12:18:55.239968', '2023-12-08 12:18:45.439905', '2023-12-08 12:19:45.439905', '53c9f3a4-ac33-4a33-b83d-17c1c87b7379', 3, b'0'),
(27, '2023-12-08 12:21:10.306850', '2023-12-08 12:21:00.807050', '2023-12-08 12:22:00.807050', '7a4cd495-09bd-4fcb-bc29-7249e2e28b67', 3, b'0'),
(28, '2023-12-08 13:14:48.313460', '2023-12-08 13:14:16.614671', '2023-12-08 13:15:16.614671', '345677f1-51c6-4944-9a28-7c945b996d4a', 3, b'0'),
(29, NULL, '2023-12-12 13:00:52.751033', '2023-12-12 13:01:52.751033', 'e4ae9a43-fd62-4796-9f6a-0a9458c08502', 3, b'0'),
(30, NULL, '2023-12-12 13:09:04.874251', '2023-12-12 13:10:04.874251', 'f52a6a82-a277-492c-ac3f-eb119dc86d5c', 3, b'0'),
(31, NULL, '2023-12-12 13:13:43.971475', '2023-12-12 13:14:43.971475', '37e11c92-1bc1-493c-b457-7d2aec905561', 3, b'0'),
(32, NULL, '2023-12-12 13:18:33.143029', '2023-12-12 13:19:33.143029', 'd9692fcf-154f-440c-8516-e35c4931118a', 8, b'0'),
(33, NULL, '2023-12-12 13:22:30.070814', '2023-12-12 13:23:30.070814', 'aa2b461d-c9fb-4bc1-9702-7a8d8d20d369', 8, b'0'),
(34, '2023-12-12 13:36:57.253379', '2023-12-12 13:31:15.382576', '2023-12-12 13:32:15.382576', '64bd1936-b8bb-4e43-a0f9-f35f513fcf63', 9, b'0'),
(35, NULL, '2023-12-12 13:36:40.732472', '2023-12-12 13:37:40.732472', '1ad83e98-6186-4fcf-9629-6a05befccb30', 9, b'0'),
(36, '2023-12-15 17:11:20.870677', '2023-12-15 17:10:10.530912', '2023-12-15 17:11:10.530912', '9c412141-560b-4e72-be04-aef5200c4135', 3, b'0'),
(40, '2023-12-16 15:39:36.752762', '2023-12-16 15:38:58.542504', '2023-12-16 15:39:58.542504', '03c4f0b0-ad3a-4732-b1bc-57e0e2032d56', 17, b'1'),
(41, '2023-12-16 16:09:10.270119', '2023-12-16 16:08:41.733982', '2023-12-16 16:09:41.733982', 'fb5e447d-b1f5-48bb-9f5f-929fed0942a5', 3, b'1'),
(42, '2023-12-17 14:05:54.661475', '2023-12-17 14:05:31.725940', '2023-12-17 14:06:31.725940', '67506317-80ce-4107-af74-6d444e57dac2', 18, b'1'),
(43, '2023-12-17 14:18:13.625374', '2023-12-17 14:17:14.986162', '2023-12-17 14:18:14.986162', '9632b552-91c5-431a-b9db-3fbbd59be277', 19, b'1'),
(44, NULL, '2023-12-17 14:18:03.348098', '2023-12-17 14:19:03.348098', '13c22bef-a414-4e33-b164-dcef75914678', 19, b'1'),
(45, NULL, '2023-12-19 09:28:38.532996', '2023-12-19 09:29:38.532996', 'd34751cd-165e-47d4-8eca-dda57e20b7d2', 8, b'1'),
(46, NULL, '2023-12-19 10:05:30.646238', '2023-12-19 10:06:30.646238', '6a0ed604-6705-4072-b920-ca9ea6f9f3e8', 8, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `address`, `email`, `name`, `phone_number`) VALUES
(3, '223, Street Queen,Chicago', 'maryjane@admin.com', 'Mary Jane', '09325884392'),
(4, 'Hamptons, Night City', NULL, 'David Martios', '092587172'),
(5, '23 Avunue, Los Santos', NULL, 'Henry Hermandez', '09038847292'),
(6, 'Quận 7 , Hồ Chí Minh', NULL, 'Trần Nhựt Anh', '0392687783'),
(7, '123 Street, Little Kinel', NULL, 'Anthony Culture', '0223335667'),
(11, 'Queen , New York', NULL, 'John Doe', '097396722'),
(12, 'Justinger , England', NULL, 'Leon Eward', '03669874451'),
(13, 'Jester , Ablite', NULL, 'Kenny Hernade', '02944458753');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint NOT NULL,
  `order_date` datetime(6) DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_date`, `customer_id`, `user_id`) VALUES
(10, '2023-12-06 14:25:58.063000', 3, 3),
(11, '2023-08-24 14:39:04.203000', 5, 1),
(12, '2023-12-06 15:08:21.946000', 6, 3),
(13, '2023-07-17 15:15:19.320000', 6, 3),
(14, '2023-12-06 16:07:48.596000', 3, 1),
(15, '2023-06-26 17:26:41.749000', 6, 5),
(16, '2023-04-06 17:34:58.010000', 6, 5),
(17, '2023-05-06 19:14:12.640000', 6, 3),
(18, '2023-12-06 22:38:06.339000', 4, 1),
(19, '2023-12-06 23:20:55.987000', 3, 1),
(20, '2023-07-19 18:25:44.793000', 5, NULL),
(21, '2023-12-07 18:26:20.468000', 4, NULL),
(22, '2023-12-07 18:33:32.332000', 5, 6),
(23, '2023-03-22 23:45:04.371000', 7, 1),
(24, '2023-01-11 17:25:49.678000', 7, 3),
(25, '2023-07-11 17:26:23.487000', 5, 3),
(26, '2023-10-11 17:26:56.652000', 4, 3),
(27, '2023-10-17 17:28:12.710000', 3, 6),
(28, '2023-12-15 17:54:15.875000', 11, 1),
(29, '2023-12-15 17:58:11.720000', 11, 7),
(30, '2023-12-17 14:07:19.631000', 12, 18),
(33, '2023-11-18 11:09:47.906000', 5, 1),
(34, '2023-06-21 11:10:05.319000', 4, 1),
(35, '2023-12-18 11:10:34.884000', 4, 1),
(36, '2023-07-24 11:53:35.749000', 4, 1),
(37, '2023-12-18 11:53:53.631000', 3, 1),
(38, '2023-12-18 15:43:33.907000', 7, 3),
(39, '2023-12-18 15:44:11.489000', 12, 3),
(40, '2023-12-18 15:44:35.061000', 4, 3),
(41, '2023-12-18 15:46:00.475000', 5, 3),
(42, '2023-12-18 15:46:15.114000', 7, 3),
(43, '2023-12-18 16:04:26.296000', 5, 3),
(44, '2023-12-18 19:04:31.438000', 7, 1),
(45, '2023-12-18 19:05:12.608000', 5, 3),
(46, '2023-12-18 19:05:29.730000', 5, 3),
(47, '2023-12-18 19:06:22.763000', 13, 3),
(48, '2023-12-19 10:11:41.583000', 6, 3),
(49, '2023-12-19 10:12:00.386000', 7, 3),
(50, '2023-12-19 10:12:38.160000', 11, 3),
(51, '2023-12-19 10:23:44.862000', 11, 3),
(52, '2023-12-19 10:23:58.165000', 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` bigint NOT NULL,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `order_id` bigint DEFAULT NULL,
  `product_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `price`, `quantity`, `order_id`, `product_id`) VALUES
(14, 117.98, 2, 10, '67bb2377-b948-4b43-90d2-1afc227a299a'),
(15, 1299, 1, 10, '956097de-24d1-417f-b8d1-86580804bb70'),
(16, 117.98, 2, 11, '67bb2377-b948-4b43-90d2-1afc227a299a'),
(17, 3897, 3, 11, '956097de-24d1-417f-b8d1-86580804bb70'),
(18, 58.99, 1, 12, '67bb2377-b948-4b43-90d2-1afc227a299a'),
(19, 15, 1, 12, '7efe1a56-a333-4605-9ebd-2f98ca7e79a6'),
(20, 900, 1, 12, '8d34a55d-f4a1-44e4-9ca8-69ee54650298'),
(21, 15, 1, 13, '7efe1a56-a333-4605-9ebd-2f98ca7e79a6'),
(22, 15.99, 1, 13, 'b7867aaa-319f-478e-8cbb-d30af37a7191'),
(23, 5.99, 1, 13, '98a2800b-6e69-4bbf-a702-47510fe3ee44'),
(24, 3198, 2, 14, 'caa58d29-e62b-496f-8ee6-f2d3a41798bd'),
(25, 15, 1, 15, '7efe1a56-a333-4605-9ebd-2f98ca7e79a6'),
(26, 58.99, 1, 15, '67bb2377-b948-4b43-90d2-1afc227a299a'),
(27, 15, 1, 16, '7efe1a56-a333-4605-9ebd-2f98ca7e79a6'),
(28, 58.99, 1, 16, '67bb2377-b948-4b43-90d2-1afc227a299a'),
(29, 15, 1, 17, '7efe1a56-a333-4605-9ebd-2f98ca7e79a6'),
(30, 176.97, 3, 17, '67bb2377-b948-4b43-90d2-1afc227a299a'),
(31, 11398, 2, 17, '294876cb-a8c0-474e-bdaa-f09eab0e7ac7'),
(32, 58.99, 1, 18, '67bb2377-b948-4b43-90d2-1afc227a299a'),
(33, 15, 1, 18, '7efe1a56-a333-4605-9ebd-2f98ca7e79a6'),
(34, 17, 1, 19, '0d04f771-5c8e-4f56-9b52-66d5eb7eb9b8'),
(35, 15, 1, 19, '7efe1a56-a333-4605-9ebd-2f98ca7e79a6'),
(36, 34, 2, 20, '0d04f771-5c8e-4f56-9b52-66d5eb7eb9b8'),
(37, 30, 2, 20, '7efe1a56-a333-4605-9ebd-2f98ca7e79a6'),
(38, 1599, 1, 21, 'caa58d29-e62b-496f-8ee6-f2d3a41798bd'),
(39, 900, 1, 21, '8d34a55d-f4a1-44e4-9ca8-69ee54650298'),
(40, 299, 1, 21, '5f313e4e-58b7-436f-9eda-8164457ed965'),
(41, 12, 1, 22, '0ea45ee1-6913-48e6-853d-488020f5b325'),
(42, 15, 1, 22, '7efe1a56-a333-4605-9ebd-2f98ca7e79a6'),
(43, 15.99, 1, 22, 'b7867aaa-319f-478e-8cbb-d30af37a7191'),
(44, 900, 1, 23, '8d34a55d-f4a1-44e4-9ca8-69ee54650298'),
(45, 12, 1, 24, '0ea45ee1-6913-48e6-853d-488020f5b325'),
(46, 34, 2, 24, '0d04f771-5c8e-4f56-9b52-66d5eb7eb9b8'),
(47, 1299, 1, 25, '956097de-24d1-417f-b8d1-86580804bb70'),
(48, 598, 2, 25, '5f313e4e-58b7-436f-9eda-8164457ed965'),
(49, 58.99, 1, 26, '67bb2377-b948-4b43-90d2-1afc227a299a'),
(50, 15.99, 1, 26, 'b7867aaa-319f-478e-8cbb-d30af37a7191'),
(51, 12, 1, 27, '0ea45ee1-6913-48e6-853d-488020f5b325'),
(52, 15, 1, 27, '7efe1a56-a333-4605-9ebd-2f98ca7e79a6'),
(53, 15.99, 1, 27, 'b7867aaa-319f-478e-8cbb-d30af37a7191'),
(54, 11.98, 2, 27, '98a2800b-6e69-4bbf-a702-47510fe3ee44'),
(55, 58.99, 1, 28, '67bb2377-b948-4b43-90d2-1afc227a299a'),
(56, 7, 1, 28, '98a2800b-6e69-4bbf-a702-47510fe3ee44'),
(57, 15.99, 1, 28, 'b7867aaa-319f-478e-8cbb-d30af37a7191'),
(58, 1599, 1, 29, 'caa58d29-e62b-496f-8ee6-f2d3a41798bd'),
(59, 900, 1, 29, '8d34a55d-f4a1-44e4-9ca8-69ee54650298'),
(60, 25, 1, 30, '0d04f771-5c8e-4f56-9b52-66d5eb7eb9b8'),
(61, 12, 1, 30, '0ea45ee1-6913-48e6-853d-488020f5b325'),
(62, 25, 1, 33, '0d04f771-5c8e-4f56-9b52-66d5eb7eb9b8'),
(63, 1000, 1, 33, '03fb79c7-5991-495f-aec6-cc7818c5fa1f'),
(64, 900, 1, 34, '8d34a55d-f4a1-44e4-9ca8-69ee54650298'),
(65, 15, 1, 34, '7efe1a56-a333-4605-9ebd-2f98ca7e79a6'),
(66, 1599, 1, 35, 'caa58d29-e62b-496f-8ee6-f2d3a41798bd'),
(67, 58.99, 1, 36, '67bb2377-b948-4b43-90d2-1afc227a299a'),
(68, 1299, 1, 37, '956097de-24d1-417f-b8d1-86580804bb70'),
(69, 58.99, 1, 38, '67bb2377-b948-4b43-90d2-1afc227a299a'),
(70, 7, 1, 38, '98a2800b-6e69-4bbf-a702-47510fe3ee44'),
(71, 900, 1, 39, '8d34a55d-f4a1-44e4-9ca8-69ee54650298'),
(72, 1599, 1, 40, 'caa58d29-e62b-496f-8ee6-f2d3a41798bd'),
(73, 300, 1, 40, '5f313e4e-58b7-436f-9eda-8164457ed965'),
(74, 1299, 1, 40, '956097de-24d1-417f-b8d1-86580804bb70'),
(75, 15, 1, 41, '7efe1a56-a333-4605-9ebd-2f98ca7e79a6'),
(76, 15.99, 1, 41, 'b7867aaa-319f-478e-8cbb-d30af37a7191'),
(77, 58.99, 1, 42, '67bb2377-b948-4b43-90d2-1afc227a299a'),
(78, 15.99, 1, 42, 'b7867aaa-319f-478e-8cbb-d30af37a7191'),
(79, 50, 2, 43, '0d04f771-5c8e-4f56-9b52-66d5eb7eb9b8'),
(80, 25, 1, 44, '0d04f771-5c8e-4f56-9b52-66d5eb7eb9b8'),
(81, 1000, 1, 44, '03fb79c7-5991-495f-aec6-cc7818c5fa1f'),
(82, 25, 1, 45, '0d04f771-5c8e-4f56-9b52-66d5eb7eb9b8'),
(83, 58.99, 1, 45, '67bb2377-b948-4b43-90d2-1afc227a299a'),
(84, 900, 1, 46, '8d34a55d-f4a1-44e4-9ca8-69ee54650298'),
(85, 1599, 1, 47, 'caa58d29-e62b-496f-8ee6-f2d3a41798bd'),
(86, 25, 1, 48, '0d04f771-5c8e-4f56-9b52-66d5eb7eb9b8'),
(87, 15, 1, 48, '7efe1a56-a333-4605-9ebd-2f98ca7e79a6'),
(88, 12, 1, 49, '0ea45ee1-6913-48e6-853d-488020f5b325'),
(89, 15, 1, 49, '7efe1a56-a333-4605-9ebd-2f98ca7e79a6'),
(90, 7, 1, 50, '98a2800b-6e69-4bbf-a702-47510fe3ee44'),
(91, 30, 2, 50, '7efe1a56-a333-4605-9ebd-2f98ca7e79a6'),
(92, 63.96, 4, 50, 'b7867aaa-319f-478e-8cbb-d30af37a7191'),
(93, 1599, 1, 51, 'caa58d29-e62b-496f-8ee6-f2d3a41798bd'),
(94, 58.99, 1, 52, '67bb2377-b948-4b43-90d2-1afc227a299a');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(255) NOT NULL,
  `bar_code_path` varchar(255) DEFAULT NULL,
  `creation_date` datetime(6) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `imported_price` double NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `qr_code_path` varchar(255) DEFAULT NULL,
  `retail_price` double NOT NULL,
  `category_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `bar_code_path`, `creation_date`, `image_path`, `imported_price`, `name`, `qr_code_path`, `retail_price`, `category_id`) VALUES
('03fb79c7-5991-495f-aec6-cc7818c5fa1f', 'src/dynamic/products/03fb79c7-5991-495f-aec6-cc7818c5fa1f/barcode.png', '2023-12-11 19:23:06.144000', 'image-1.jpg', 300, 'PS5', 'src/dynamic/products/03fb79c7-5991-495f-aec6-cc7818c5fa1f/QRcode.png', 1000, '4c1d382f-0e22-4d80-81a8-ce063dc98251'),
('0829a1f0-8e2e-439f-8370-ac2bbf08a337', 'src/dynamic/products/0829a1f0-8e2e-439f-8370-ac2bbf08a337/barcode.png', '2023-12-19 10:25:02.307000', 'image-OIP.jpg', 500, '', 'src/dynamic/products/0829a1f0-8e2e-439f-8370-ac2bbf08a337/QRcode.png', 700, '4c1d382f-0e22-4d80-81a8-ce063dc98251'),
('0d04f771-5c8e-4f56-9b52-66d5eb7eb9b8', 'src/dynamic/products/0d04f771-5c8e-4f56-9b52-66d5eb7eb9b8/barcode.png', '2023-12-06 22:49:16.276000', 'image-sweatpants.jpg', 12, 'Nike Sweatpant', 'src/dynamic/products/0d04f771-5c8e-4f56-9b52-66d5eb7eb9b8/QRcode.png', 25, '23e0ef74-1c3a-43a2-9717-145405db8a0b'),
('0ea45ee1-6913-48e6-853d-488020f5b325', 'src/dynamic/products/0ea45ee1-6913-48e6-853d-488020f5b325/barcode.png', '2023-12-07 15:39:36.795000', 'image-1012.png', 5, 'Test Update', 'src/dynamic/products/0ea45ee1-6913-48e6-853d-488020f5b325/QRcode.png', 12, '4fd911fd-4c4e-4349-8029-01f4f5a468e8'),
('294876cb-a8c0-474e-bdaa-f09eab0e7ac7', 'src/dynamic/products/294876cb-a8c0-474e-bdaa-f09eab0e7ac7/barcode.png', '2023-12-05 21:47:52.713000', 'image-OIP (1).jpg', 3200, 'Cartier barcelet', 'src/dynamic/products/294876cb-a8c0-474e-bdaa-f09eab0e7ac7/QRcode.png', 4000, 'f553def4-00d0-4144-beb2-c27aa863fc40'),
('5f313e4e-58b7-436f-9eda-8164457ed965', 'src/dynamic/products/5f313e4e-58b7-436f-9eda-8164457ed965/barcode.png', '2023-12-06 22:41:12.888000', 'image-airpod.jpg', 250, 'AirPod 3', 'src/dynamic/products/5f313e4e-58b7-436f-9eda-8164457ed965/QRcode.png', 300, '507693a9-ba9d-47b4-86b6-139553b39334'),
('67bb2377-b948-4b43-90d2-1afc227a299a', 'src/dynamic/products/67bb2377-b948-4b43-90d2-1afc227a299a/barcode.png', '2023-12-05 10:41:15.925000', 'image-OIP.jpg', 50, 'Raspberry Pi 5 Limited', 'src/dynamic/products/67bb2377-b948-4b43-90d2-1afc227a299a/QRcode.png', 58.99, '4c1d382f-0e22-4d80-81a8-ce063dc98251'),
('7efe1a56-a333-4605-9ebd-2f98ca7e79a6', 'src/dynamic/products/7efe1a56-a333-4605-9ebd-2f98ca7e79a6/barcode.png', '2023-12-05 21:50:10.089000', 'image-OIP (2).jpg', 12, 'White Hoodie', 'src/dynamic/products/7efe1a56-a333-4605-9ebd-2f98ca7e79a6/QRcode.png', 15, '23e0ef74-1c3a-43a2-9717-145405db8a0b'),
('8d34a55d-f4a1-44e4-9ca8-69ee54650298', 'src/dynamic/products/8d34a55d-f4a1-44e4-9ca8-69ee54650298/barcode.png', '2023-12-04 17:09:29.399000', 'image-samsung-galaxy-s23-tim-glr-1.jpg', 788, 'Samsung Galaxy S34', 'src/dynamic/products/8d34a55d-f4a1-44e4-9ca8-69ee54650298/QRcode.png', 900, '4c1d382f-0e22-4d80-81a8-ce063dc98251'),
('956097de-24d1-417f-b8d1-86580804bb70', 'src/dynamic/products/956097de-24d1-417f-b8d1-86580804bb70/barcode.png', '2023-12-04 15:40:26.602000', 'image-iphone-15.png', 1000, 'Iphone 15 Pro Max', 'src/dynamic/products/956097de-24d1-417f-b8d1-86580804bb70/QRcode.png', 1299, '507693a9-ba9d-47b4-86b6-139553b39334'),
('98a2800b-6e69-4bbf-a702-47510fe3ee44', 'src/dynamic/products/98a2800b-6e69-4bbf-a702-47510fe3ee44/barcode.png', '2023-12-04 15:40:50.879000', 'image-book.jpg', 4, 'Oath And Honor', 'src/dynamic/products/98a2800b-6e69-4bbf-a702-47510fe3ee44/QRcode.png', 7, 'a4b6b65a-82d8-4f0e-99c3-d4895fb79f10'),
('b7867aaa-319f-478e-8cbb-d30af37a7191', 'src/dynamic/products/b7867aaa-319f-478e-8cbb-d30af37a7191/barcode.png', '2023-12-05 10:39:49.047000', 'image-creatine.jpg', 13, 'Creatine', 'src/dynamic/products/b7867aaa-319f-478e-8cbb-d30af37a7191/QRcode.png', 15.99, '3f6db2c2-5272-4215-b352-861e318c5888'),
('caa58d29-e62b-496f-8ee6-f2d3a41798bd', 'src/dynamic/products/caa58d29-e62b-496f-8ee6-f2d3a41798bd/barcode.png', '2023-12-04 15:39:43.402000', 'image-mac_m1.jpg', 1299, 'Macbook Pro M1', 'src/dynamic/products/caa58d29-e62b-496f-8ee6-f2d3a41798bd/QRcode.png', 1599, '507693a9-ba9d-47b4-86b6-139553b39334'),
('ccdbe98b-3e61-4608-9dde-a4b36820dd11', 'src/dynamic/products/ccdbe98b-3e61-4608-9dde-a4b36820dd11/barcode.png', '2023-12-19 10:26:07.437000', 'image-OIP (3).jpg', 70, 'SSD 521GB', 'src/dynamic/products/ccdbe98b-3e61-4608-9dde-a4b36820dd11/QRcode.png', 80, '4fd911fd-4c4e-4349-8029-01f4f5a468e8');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` enum('ROLE_USER','ROLE_MODERATOR','ROLE_ADMIN') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'ROLE_USER'),
(2, 'ROLE_MODERATOR'),
(4, 'ROLE_ADMIN');

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

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `enabled` bit(1) DEFAULT NULL,
  `locked` bit(1) DEFAULT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `profile_picture_path` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `is_fist_login` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `enabled`, `locked`, `last_login`, `profile_picture_path`, `full_name`, `is_fist_login`) VALUES
(1, 'email@admin.com', '$2a$10$n7ayQoPYRuMdcOFwAixxEeZF2tRVaAH6v6ET3s0p6rksobqOZU962', 'admin', b'1', b'0', '2023-12-19 10:24:07.729000', 'profile-dog.png', 'Trần Nhựt Anh', b'0'),
(3, 'lovecraftmad08@gmail.com', '$2a$10$miYD1BM0FK9fsRqF/QXbfegmXqDv8LAez/ANbqoVM0lwpvu4PmCRm', 'lovecraftmad08', b'1', b'0', '2023-12-19 10:06:18.612000', 'profile-profile.jpg', 'Johnny SilverHand', b'0'),
(4, 'fomliyefya@gufum.com', '$2a$10$sHjmeSQFRM9e9iBzBq7QUe57DSVvTDck/1NPIUXFSY4UCIe/uXw3m', 'fomliyefya', b'0', b'0', NULL, NULL, 'folyed', b'0'),
(5, 'baltutegne@gufum.com', '$2a$10$C6uvgY2ZqjwtSuZI9BCApenUmbTnVMoPTItBan6fEsl1ROTgxtziG', 'baltutegne', b'1', b'0', '2023-12-07 12:19:26.433000', 'profile-R.png', 'Kate Marinejone', b'0'),
(6, 'maderinlovecraft@proton.me', '$2a$10$w8PFEY6C10dSKJ3nuw5BoeQkPrnZSCDB3EHhrQiNyhh4NhkoypAse', 'maderinlovecraft', b'1', b'0', '2023-12-11 17:27:36.430000', 'profile-pexels-suliman-sallehi-1704488.jpg', 'Vincent Mard', b'0'),
(7, 'colmesifye@gufum.com', '$2a$10$oEILDO5EAdz3Fkm54bIaJevIdSNCn1w7JJyjc2ht9wS9cjlCko1j.', 'colmesifye', b'1', b'0', '2023-12-15 18:05:02.107000', 'profile-blank_profile.jpg', 'Trần Văn B', b'0'),
(8, 'rawor23690@mcenb.com', '$2a$10$XC8GICIL621YOU.2/D1HeejA95aUIC0VfnW0NdYfWxU.lWg5PXhGy', 'rawor23690', b'0', b'0', NULL, NULL, 'Trần Nhựt Anh', b'0'),
(9, 'hexaden844@gearstag.com', '$2a$10$.Gyb.MMr7NYkIPIV9QNeN.c.Uqk48AgjEcagt9AkCEyLfNNlo8vm2', 'hexaden844', b'1', b'0', '2023-12-16 11:28:17.016000', NULL, 'Nhut Anh', b'0'),
(10, 'gortizelto@gufum.com', '$2a$10$ViX.BPeFj3kWUlDRwt8MYeRlvBvIkruUBzTPFdvWy8Whc87C.8k1G', 'gortizelto', b'1', b'0', NULL, NULL, 'Vincent Jackie', b'0'),
(11, 'kospidolmo@gufum.com', '$2a$10$DibIvU9OKxem1PKTLvjmIun84M8eQ0WxQAtTd/eAQ5DjG7JUDAIzK', 'kospidolmo', b'1', b'0', '2023-12-16 14:57:56.710000', NULL, 'kso', b'1'),
(15, 'kurtucegne@gufum.com', '$2a$10$J0YjWV9Rx.RelaCAsM.PIOpDXeUYHA/zhTEmPvwaKDe7B7ttoNKQO', 'kurtucegne', b'0', b'0', NULL, NULL, 'lenny Fable', b'1'),
(16, 'kapsazerte@gufum.com', '$2a$10$s25l024y3ati0BSTaVu40eJAzFQz0StkvEuAYxnu95WMNHhhN6ZNO', 'kapsazerte', b'0', b'0', NULL, NULL, 'Henry Madersion', b'1'),
(17, 'feydetakno@gufum.com', '$2a$10$kxVFx8hzJJtNQw2AxiyuLeXq4kzEVgpfw51rZ3Zbz0csgWY51Sk/G', 'feydetakno', b'1', b'0', '2023-12-16 15:40:23.859000', NULL, 'Jackie Mazdei', b'0'),
(18, 'jidrifospi@gufum.com', '$2a$10$vWTcdTjW9.vBOAPXlbFnhOW/Mi2HngaIDchAy2WEDawJKeNZnWJgy', 'jidrifospi', b'1', b'0', '2023-12-17 14:09:47.922000', 'profile-blank_profile.jpg', 'Leon Eward', b'0'),
(19, 'yavetid230@apdiv.com', '$2a$10$uywvCqwFDQLQbU4S2OSnTOY8UZjZILnHT0MvbzYFnAvnvSO4./Hke', 'yavetid230', b'1', b'0', '2023-12-17 14:20:38.386000', 'profile-razer-ths-logo.svg', 'user test', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 1),
(19, 1),
(1, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `confirmation_token`
--
ALTER TABLE `confirmation_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKah4p1rycwibwm6s9bsyeckq51` (`user_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKpxtb8awmi0dk6smoh2vp1litg` (`customer_id`),
  ADD KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKjyu2qbqt8gnvno9oe9j2s2ldk` (`order_id`),
  ADD KEY `FK4q98utpd73imf4yhttm3w0eax` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKog2rp4qthbtt2lfyhfo32lsw9` (`category_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_rthu6t9h3qfej8txljv8msly0` (`order_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `confirmation_token`
--
ALTER TABLE `confirmation_token`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `confirmation_token`
--
ALTER TABLE `confirmation_token`
  ADD CONSTRAINT `FKah4p1rycwibwm6s9bsyeckq51` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKpxtb8awmi0dk6smoh2vp1litg` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `FK4q98utpd73imf4yhttm3w0eax` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `FKjyu2qbqt8gnvno9oe9j2s2ldk` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FKog2rp4qthbtt2lfyhfo32lsw9` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `FKfyxndk58yiq2vpn0yd4m09kbt` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
