-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 18, 2023 at 03:25 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz`
--

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `id` int(10) NOT NULL,
  `title` varchar(32) NOT NULL,
  `score` int(3) NOT NULL,
  `question` varchar(200) NOT NULL,
  `option_1` varchar(200) NOT NULL,
  `option_2` varchar(200) NOT NULL,
  `option_3` varchar(200) NOT NULL,
  `option_4` varchar(200) NOT NULL,
  `correct_answer` varchar(8) NOT NULL,
  `created_by` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`id`, `title`, `score`, `question`, `option_1`, `option_2`, `option_3`, `option_4`, `correct_answer`, `created_by`) VALUES
(1, 'Bahasa Indonesia 1', 10, 'Membaca intensif merupakan kegiatan membaca suatu bacaan secara', 'Sambil lalu', 'Sekilas', 'Mendalam', 'Teori', 'option_3', 1),
(3, 'Bahasa Indonesia 2', 10, 'Kalimat utama biasanya terdapat pada tiap', 'Kata', 'Paragraf', 'Kalimat', 'Suku kata', 'option_2', 1),
(4, 'Bahasa Indonesia 3', 10, 'Rencana kerja yang memuat garis – garis besar suatu karangan disebut', 'Tema Karangan', 'Kerangka Karangan', 'Topik Karangan', 'Judul Karangan', 'option_2', 1),
(5, 'Bahasa Indonesia 4', 10, 'Kegemaran sama artinya dengan', 'Hal yang disukai', 'Hal yang menyenangkan', 'Kegiatan sehari-hari', 'Kegiatan menghilangkan kejenuhan', 'option_1', 1),
(6, 'Bahasa Indonesia 5', 10, 'Berikut ini bukan kegemaran yang biasa dilakukan anak laki-laki adalah bermain', 'Bola', 'Kelereng', 'Layang-layang', 'Boneka', 'option_4', 1),
(7, 'Bahasa Indonesia 6', 10, 'Salah satu contoh media cetak yang dapat digunakan untuk menyampaikan pengumuman adalah', 'Radio', 'Koran', 'Televisi', 'Internet', 'option_2', 1),
(8, 'Bahasa Indonesia 7', 10, 'Karya sastra berupa pantun termasuk jenis puisi', 'Lama', 'Baru', 'Modern', 'Bebas', 'option_1', 1),
(9, 'Bahasa Indonesia 8', 10, 'Penggunaan dari kata “yang” yang terdapat dalam kalimat “Risa membeli buku yang tebal” memiliki fungi sebagai yaitu', 'Kata penghubung', 'Kata ganti benda', 'Kata tanya', 'Kata penguat', 'option_2', 1),
(10, 'Bahasa Indonesia 9', 10, 'Baris pertama dan kedua pada pantun merupakan', 'Isi', 'Sampiran', 'Tema', 'Gagasan pokok', 'option_2', 1),
(11, 'Bahasa Indonesia 10', 10, 'Persamaan bunyi pada akhir baris pantun disebut', 'Bait', 'Rima', 'Baris', 'Ritme', 'option_2', 1);

-- --------------------------------------------------------

--
-- Table structure for table `timer`
--

CREATE TABLE `timer` (
  `id` int(10) NOT NULL,
  `time` int(4) NOT NULL,
  `created_by` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `timer`
--

INSERT INTO `timer` (`id`, `time`, `created_by`) VALUES
(1, 15, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(20) NOT NULL,
  `role` varchar(5) NOT NULL,
  `email` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `email`) VALUES
(1, 'admin', 'Admin123', 'admin', 'admin@gmail.com'),
(2, 'tes', 'Tes123', 'user', 'tes@gmail.com'),
(8, 'admin', 'Asdasd1', 'user', 'admin@demo.com'),
(9, 'admin', 'Asdasd1', 'user', 'admin@gmail.coms');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `timer`
--
ALTER TABLE `timer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `timer`
--
ALTER TABLE `timer`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `timer`
--
ALTER TABLE `timer`
  ADD CONSTRAINT `timer_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
