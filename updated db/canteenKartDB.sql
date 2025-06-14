-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2025 at 04:19 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cafe_new`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `barcode_number` varchar(25) DEFAULT NULL,
  `serving_time` time DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `booking_status` varchar(15) DEFAULT NULL,
  `booking_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `barcode_number`, `serving_time`, `student_id`, `booking_status`, `booking_date`) VALUES
(5, '1743571362481mfpnmvc1h', '10:53:00', 28, 'Cancelled', '2025-04-02 05:22:42'),
(6, '1743673364156081a6qjqf', '15:12:00', 28, 'Order Placed', '2025-04-03 09:42:44'),
(7, '218124', '17:56:00', 28, 'Order Placed', '2025-04-03 11:26:43'),
(8, '158823', '17:34:00', 28, 'Order Placed', '2025-04-03 12:04:52'),
(9, '284524', '17:37:00', 28, 'Order Placed', '2025-04-03 12:07:41'),
(10, '211805', '17:39:00', 28, 'Order Placed', '2025-04-03 12:09:24'),
(11, '671723', '17:40:00', 28, 'Order Placed', '2025-04-03 12:10:21'),
(12, '222010', '17:02:00', 28, 'Order Placed', '2025-04-07 11:31:23'),
(13, '370002', '10:38:00', 28, 'Cancelled', '2025-04-20 14:08:33'),
(14, '224183', '12:30:00', 28, 'Cancelled', '2025-04-25 06:42:32'),
(15, '801302', '18:10:00', 28, 'Cancelled', '2025-04-25 10:38:57'),
(16, '384354', '16:10:00', 28, 'Cancelled', '2025-04-25 10:39:51'),
(17, '390175', '19:25:00', 28, 'Cancelled', '2025-04-25 10:51:39'),
(18, '194095', '18:34:00', 28, 'Cancelled', '2025-04-25 11:01:18'),
(19, '358192', '23:17:00', 35, 'Completed', '2025-04-29 15:47:42'),
(20, '290978', '23:19:00', 36, 'Completed', '2025-04-29 15:50:14'),
(21, '643953', '21:35:00', 36, 'Completed', '2025-04-29 16:04:19'),
(22, '563022', '21:38:00', 2, 'Completed', '2025-04-29 16:08:17'),
(23, '109658', '13:11:00', 36, 'Completed', '2025-04-30 04:41:11'),
(24, '844633', '10:15:00', 36, 'Completed', '2025-04-30 04:41:36'),
(25, '580351', '10:12:00', 36, 'Completed', '2025-04-30 04:42:01'),
(26, '661598', '11:14:00', 28, 'Cancelled', '2025-04-30 04:44:14'),
(27, '849368', '10:29:00', 36, 'Completed', '2025-04-30 04:58:53'),
(28, '804571', '11:32:00', 21, 'Completed', '2025-04-30 06:01:11'),
(29, '418311', '13:44:00', 38, 'Cancelled', '2025-04-30 08:15:44'),
(30, '781537', '18:32:00', 38, 'Cancelled', '2025-04-30 13:00:39'),
(31, '437707', '21:41:00', 43, 'Completed', '2025-05-17 16:12:17'),
(32, '374562', '22:30:00', 42, 'Cancelled', '2025-05-17 16:20:24'),
(33, '129925', '11:30:00', 2, 'Completed', '2025-05-19 04:34:51'),
(34, '437712', '13:10:00', 2, 'Completed', '2025-05-19 04:40:38'),
(35, '362702', '20:30:00', 2, 'Completed', '2025-05-20 13:56:19'),
(36, '554033', '12:30:00', 2, 'Order Placed', '2025-05-22 06:21:12'),
(37, '342682', '12:30:00', 2, 'Order Placed', '2025-05-22 06:24:38'),
(38, '223180', '16:43:00', 2, 'Order Placed', '2025-05-30 08:14:03'),
(39, '291134', '16:04:00', 20, 'Order Placed', '2025-05-30 09:34:18'),
(40, '196081', '20:06:00', 2, 'Order Placed', '2025-05-30 09:36:16'),
(41, '450503', '15:53:00', 2, 'Completed', '2025-05-30 10:23:53'),
(42, '814338', '11:10:00', 2, 'Order Placed', '2025-05-31 04:39:13');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) DEFAULT NULL,
  `category_image` varchar(25) DEFAULT NULL,
  `category_date_create` timestamp NULL DEFAULT NULL,
  `category_status` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_image`, `category_date_create`, `category_status`) VALUES
(10, 'Beverages', 'uploads\\1747468070637.png', NULL, 'active'),
(12, 'Snacks', 'uploads\\1747468442841.png', NULL, 'active'),
(13, 'Thali', 'uploads\\1747468294925.jpg', NULL, 'active'),
(15, 'Breakfast', 'uploads\\1747488342896.jpg', NULL, 'active'),
(16, 'Desserts and Milkshakes', 'uploads\\1747488366229.jpg', NULL, 'active'),
(17, 'Chicken Special', 'uploads\\1747488428172.jpg', NULL, 'active'),
(18, 'Fast food', 'uploads\\1747488536563.jpg', NULL, 'active'),
(19, 'Rice Items', 'uploads\\1747488559420.jpg', NULL, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `item_name` varchar(50) DEFAULT NULL,
  `item_image` varchar(25) DEFAULT NULL,
  `item_date_create` timestamp NULL DEFAULT NULL,
  `item_status` varchar(10) DEFAULT NULL,
  `item_price` int(11) DEFAULT NULL,
  `item_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `category_id`, `item_name`, `item_image`, `item_date_create`, `item_status`, `item_price`, `item_description`) VALUES
(8, 15, 'Idli Vada', 'uploads\\1747488828617.jpg', NULL, 'active', 30, 'Breakfast'),
(10, 15, 'Paratha', 'uploads\\1747492474741.jpg', NULL, 'active', 30, 'Breakfast'),
(11, 15, 'Chapathi', 'uploads\\1747492521709.jpg', NULL, 'active', 30, 'Breakfast'),
(12, 15, 'Dosa', 'uploads\\1747492550556.jpg', NULL, 'active', 30, 'Breakfast'),
(13, 15, 'Mangalore Buns', 'uploads\\1747492628426.jpg', NULL, 'active', 30, 'Breakfast'),
(14, 12, 'Burger', 'uploads\\1747492714385.jpg', NULL, 'active', 40, 'Snacks'),
(15, 12, 'French fries', 'uploads\\1747492748414.jpg', NULL, 'active', 40, 'Snacks'),
(16, 12, 'Egg Puffs', 'uploads\\1747492789876.jpg', NULL, 'active', 20, 'Snacks'),
(17, 12, 'Sandwich', 'uploads\\1747492824814.jpg', NULL, 'active', 30, 'Snacks'),
(18, 12, 'Samosa', 'uploads\\1747492876365.jpg', NULL, 'active', 10, 'Snacks'),
(19, 12, 'Spring rolls', 'uploads\\1747492918553.png', NULL, 'active', 20, 'Snacks'),
(20, 10, 'Tea', 'uploads\\1747492975708.jpg', NULL, 'active', 10, 'Beverages'),
(21, 10, 'Coffee', 'uploads\\1747493042257.jpg', NULL, 'active', 10, 'Beverages'),
(22, 10, 'Lemon tea', 'uploads\\1747495848073.jpg', NULL, 'active', 10, 'Beverages'),
(23, 10, 'Watermelon juice', 'uploads\\1747493112356.jpg', NULL, 'active', 20, 'Beverages'),
(24, 10, 'Fruit juice', 'uploads\\1747493179459.jpg', NULL, 'active', 20, 'Beverages'),
(25, 16, 'Gulab jamun', 'uploads\\1747493351155.jpg', NULL, 'active', 20, 'Dessert'),
(26, 16, 'Carrot halwa', 'uploads\\1747493396761.jpg', NULL, 'active', 20, 'Dessert'),
(27, 16, 'Oreo Milkshake', 'uploads\\1747493438444.jpg', NULL, 'active', 25, 'Milkshake'),
(28, 16, 'Fruit Milkshakes', 'uploads\\1747493492575.jpg', NULL, 'active', 25, 'Milkshake'),
(29, 16, 'Gudbud', 'uploads\\1747493535206.jpg', NULL, 'active', 50, 'Ice cream'),
(30, 13, 'Veg thali', 'uploads\\1747493580228.jpg', NULL, 'active', 40, 'Thali'),
(31, 13, 'Chicken thali', 'uploads\\1747493626980.jpg', NULL, 'active', 60, 'Thali'),
(32, 13, 'Chinese thali', 'uploads\\1747493682970.jpg', NULL, 'active', 60, 'Thali'),
(33, 19, 'Chicken biriyani', 'uploads\\1747495062132.jpg', NULL, 'active', 100, 'Rice item'),
(34, 19, 'Egg biriyani', 'uploads\\1747495109341.jpg', NULL, 'active', 70, 'Rice item'),
(35, 19, 'Fried rice', 'uploads\\1747495144063.jpg', NULL, 'active', 50, 'Rice item'),
(36, 19, 'Veg Palav', 'uploads\\1747495199463.jpg', NULL, 'active', 30, 'Rice item'),
(37, 19, 'Tomato rice', 'uploads\\1747495227998.jpg', NULL, 'active', 30, 'Rice item'),
(38, 18, 'Fried rice', 'uploads\\1747495312054.jpg', NULL, 'active', 50, 'Fast food'),
(39, 18, 'Noodles', 'uploads\\1747495351089.jpg', NULL, 'active', 50, 'Fast food'),
(40, 18, 'Pasta', 'uploads\\1747495378515.jpg', NULL, 'active', 40, 'Fast food'),
(41, 18, 'Vada Pav', 'uploads\\1747495419286.jpg', NULL, 'active', 20, 'Fast food'),
(42, 18, 'Pav baji', 'uploads\\1747495465925.jpg', NULL, 'active', 30, 'Fast food'),
(43, 17, 'Chicken 65', 'uploads\\1747495558872.jpg', NULL, 'active', 60, 'Chicken special'),
(44, 17, 'Chicken Lollipop', 'uploads\\1747495590829.jpg', NULL, 'active', 60, 'Chicken special'),
(45, 17, 'Chicken Nuggets', 'uploads\\1747495617229.jpg', NULL, 'active', 60, 'Chicken special'),
(46, 17, 'Chicken Kebab', 'uploads\\1747495648633.jpg', NULL, 'active', 50, 'Chicken special'),
(47, 17, 'Chicken Manchurian', 'uploads\\1747495691746.jpg', NULL, 'active', 60, 'Chicken special'),
(48, 17, 'Chicken Popcorn', 'uploads\\1747495743313.jpg', NULL, 'active', 60, 'Chicken special');

-- --------------------------------------------------------

--
-- Table structure for table `login_master`
--

CREATE TABLE `login_master` (
  `login_id` int(11) NOT NULL,
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `user_type` varchar(10) DEFAULT NULL,
  `user_password` varchar(25) DEFAULT NULL,
  `login_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_master`
--

INSERT INTO `login_master` (`login_id`, `user_name`, `user_type`, `user_password`, `login_date`) VALUES
(1, 'admin', 'admin', '123', NULL),
(2, 'U05VB22S0003', 'Student', 'joel', NULL),
(20, 'U05VB22S0009', 'Student', 'chuti', NULL),
(21, 'U05VB22S0052', 'Student', 'sumith', NULL),
(28, 'ATS1234567', 'Student', 'STD2217', '2025-03-24 05:53:02'),
(29, 'STAFF7880', 'Staff', 'PSD3336', '2025-03-26 05:37:47'),
(36, 'U05VB22S0101', 'Student', 'anil', NULL),
(42, 'U05VB22S0068', 'Student', 'sathvik', '2025-05-17 16:07:08'),
(43, 'U05VB22S0063', 'Student', 'ritheesh', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `staff_name` varchar(50) DEFAULT NULL,
  `staff_email_id` varchar(75) DEFAULT NULL,
  `staff_phone_number` varchar(10) DEFAULT NULL,
  `staff_status` varchar(10) DEFAULT NULL,
  `staff_date_create` timestamp NULL DEFAULT NULL,
  `staff_login` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_id`, `staff_name`, `staff_email_id`, `staff_phone_number`, `staff_status`, `staff_date_create`, `staff_login`) VALUES
(3, 'Sumi', 'sumi@gmail.com', '8765908765', 'active', NULL, NULL),
(4, 'Joe', 'joe@gmail.com', '9898989898', 'active', NULL, NULL),
(8, 'lena', 'lena@gmail.com', '7657657657', 'Active', '2025-03-26 05:37:47', 'STAFF7880');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `student_name` varchar(50) DEFAULT NULL,
  `student_register_number` varchar(50) DEFAULT NULL,
  `student_address` text DEFAULT NULL,
  `student_phone_number` varchar(10) DEFAULT NULL,
  `student_email_address` varchar(75) DEFAULT NULL,
  `student_image` varchar(25) DEFAULT NULL,
  `balance` int(11) DEFAULT NULL,
  `student_status` varchar(10) DEFAULT NULL,
  `student_date_create` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `student_name`, `student_register_number`, `student_address`, `student_phone_number`, `student_email_address`, `student_image`, `balance`, `student_status`, `student_date_create`) VALUES
(2, 'Joel A', 'U05VB22S0003', 'Gopadi', '8296771219', 'akashlobo0311@gmail.com', 'uploads\\1747886149844.png', 2100, 'Active', NULL),
(3, 'Chuti', 'U05VB22S0009', 'Halady', '8239794244', 'kkacharyahorlijed@gmail.com', 'uploads\\1747886142618.png', 100, 'Active', NULL),
(9, 'Mohammad Ashik', 'ATS123456789', 'Paraneerukatte House Kabaka Post And PutturTaluk', '9148097564', 'ashiqkbk10@gmail.com', 'uploads\\1747886131348.png', 3929, 'Active', '2025-03-24 05:53:02'),
(17, 'Anil', 'U05VB22S0101', 'Gopadi', '1234554321', 'jeevananil1808@gmail.com', 'uploads\\1747886063128.png', 1000, 'Active', '2025-04-29 15:50:07'),
(19, 'Sumith', 'U05VB22S0052', 'Katapady', '1231231231', 'sumith@gmail.com', 'uploads\\1747886051571.png', 1500, 'Active', '2025-04-30 06:01:01'),
(24, 'Sathvik', 'U05VB22S0068', 'Shringeri', '9876543210', 'sathvikhs952@gmail.com', 'uploads\\1747886039511.png', 1000, 'Active', '2025-05-17 16:07:08'),
(25, 'Ritheesh', 'U05VB22S0063', 'Nagara', '9191919191', 'ritheesh@gmail.com', 'uploads\\1747498333191.png', 1000, 'In-Active', '2025-05-17 16:12:13');

-- --------------------------------------------------------

--
-- Table structure for table `temp`
--

CREATE TABLE `temp` (
  `temp_id` int(11) NOT NULL,
  `token_number` varchar(25) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `temp`
--

INSERT INTO `temp` (`temp_id`, `token_number`, `item_id`, `quantity`) VALUES
(1, '1743048577868dkb8x04lg', 5, 2),
(2, '1743048577869os2s5j56f', 4, 1),
(3, '1743048701145hoyw0evs8', 5, 2),
(4, '1743500912082xrfo7ya2n', 5, 2),
(5, '1743568131186dgf6ehlrc', 1, 1),
(6, '1743571362481mfpnmvc1h', 5, 1),
(7, '1743571362481mfpnmvc1h', 4, 1),
(8, '1743673364156081a6qjqf', 1, 3),
(9, '218124', 1, 1),
(10, '158823', 1, 1),
(11, '284524', 1, 2),
(12, '211805', 5, 1),
(13, '671723', 4, 1),
(14, '222010', 4, 1),
(15, '222010', 1, 1),
(16, '370002', 5, 2),
(17, '370002', 1, 1),
(18, '224183', 5, 7),
(19, '224183', 1, 1),
(20, '224183', 4, 1),
(21, '801302', 4, 1),
(22, '384354', 1, 1),
(23, '390175', 1, 4),
(24, '390175', 5, 2),
(25, '194095', 1, 2),
(26, '358192', 1, 2),
(27, '358192', 6, 2),
(28, '290978', 1, 1),
(29, '643953', 4, 1),
(30, '563022', 1, 2),
(31, '109658', 1, 2),
(32, '109658', 5, 1),
(33, '844633', 6, 30),
(34, '844633', 4, 1),
(35, '580351', 4, 43),
(36, '661598', 6, 33),
(37, '849368', 1, 1),
(38, '804571', 5, 1),
(39, '418311', 6, 1),
(40, '781537', 6, 1),
(41, '437707', 21, 1),
(42, '374562', 23, 1),
(43, '374562', 12, 1),
(44, '374562', 43, 1),
(45, '374562', 25, 1),
(46, '374562', 38, 1),
(47, '374562', 33, 1),
(48, '374562', 14, 1),
(49, '374562', 31, 1),
(50, '129925', 12, 1),
(51, '129925', 8, 1),
(52, '129925', 26, 1),
(53, '129925', 29, 1),
(54, '129925', 27, 1),
(55, '129925', 19, 1),
(56, '129925', 15, 1),
(57, '129925', 16, 1),
(58, '437712', 24, 1),
(59, '437712', 10, 1),
(60, '437712', 43, 1),
(61, '362702', 21, 1),
(62, '362702', 23, 1),
(63, '362702', 38, 1),
(64, '362702', 39, 1),
(65, '362702', 27, 1),
(66, '554033', 10, 1),
(67, '554033', 47, 1),
(68, '554033', 33, 1),
(69, '554033', 25, 1),
(70, '342682', 10, 1),
(71, '342682', 47, 1),
(72, '342682', 33, 1),
(73, '342682', 25, 1),
(74, '223180', 23, 1),
(75, '223180', 22, 1),
(76, '223180', 46, 1),
(77, '223180', 39, 2),
(78, '223180', 29, 1),
(79, '291134', 46, 2),
(80, '196081', 24, 1),
(81, '196081', 29, 4),
(82, '450503', 26, 1),
(83, '450503', 28, 1),
(84, '450503', 40, 1),
(85, '450503', 43, 1),
(86, '814338', 38, 1),
(87, '814338', 21, 5),
(88, '814338', 24, 1),
(89, '814338', 12, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `login_master`
--
ALTER TABLE `login_master`
  ADD PRIMARY KEY (`login_id`),
  ADD UNIQUE KEY `unique_user_name` (`user_name`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `temp`
--
ALTER TABLE `temp`
  ADD PRIMARY KEY (`temp_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `login_master`
--
ALTER TABLE `login_master`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `temp`
--
ALTER TABLE `temp`
  MODIFY `temp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
