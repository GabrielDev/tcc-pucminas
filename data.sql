
#INICIAR
# CREATE DATABASE IF NOT EXISTS doggis; USE doggis;
# CREATE USER 'doggisApp'@'%' IDENTIFIED BY 'Doggis@2019';
# GRANT ALL PRIVILEGES ON doggis.* TO 'doggisApp'@'%';

USE doggis;

#PERFIS
INSERT IGNORE INTO perfil (id_perfil, dt_inclusao, descricao) VALUES
(1, NOW(), 'Administrador'),
(2, NOW(), 'Atendente'),
(3, NOW(), 'Veterinário'),
(4, NOW(), 'Cliente');

#PAPEL
INSERT IGNORE INTO papel (id_papel, dt_inclusao, menu, descricao) VALUES
(1, NOW(), 'agenda', 'Agenda'),
(2, NOW(), 'avaliacao', 'Avaliação'),
(3, NOW(), 'categoria', 'Categorias'),
(4, NOW(), 'cliente', 'Clientes'),
(5, NOW(), 'especie', 'Especies'),
(6, NOW(), 'estado', 'Estados'),
(7, NOW(), 'estoque', 'Estoque'),
(8, NOW(), 'fabricante', 'Fabricantes'),
(9, NOW(), 'pagamento', 'Meios de pagamento'),
(10, NOW(), 'papel', 'Papeis'),
(11, NOW(), 'pedido', 'Pedidos'),
(12, NOW(), 'perfil', 'Perfis'),
(13, NOW(), 'pet', 'Pets'),
(14, NOW(), 'porte', 'Portes'),
(15, NOW(), 'produto', 'Produtos'),
(16, NOW(), 'promocao', 'Promoções'),
(17, NOW(), 'raca', 'Raças'),
(18, NOW(), 'servico', 'Serviços'),
(19, NOW(), 'usuario', 'Usuários'),
(20, NOW(), 'meu-perfil', 'Perfil'),
(21, NOW(), 'meus-pedidos', 'Meus pedidos'),
(22, NOW(), 'dashboard', 'Relatórios'),
(23, NOW(), 'venda', 'Vendas');

#PERFIL_PAPEL · ADMINISTRADOR
INSERT IGNORE INTO perfil_papel (id_perfil, id_papel) SELECT 1, id_papel FROM papel;

#PERFIL_PAPEL · ATENDENTE
INSERT IGNORE INTO perfil_papel (id_perfil, id_papel) VALUES
(2, 1),
(2, 4),
(2, 20);

#PERFIL_PAPEL · VETERINARIO

#PERFIL_PAPEL · CLIENTE
INSERT IGNORE INTO perfil_papel (id_perfil, id_papel) VALUES
(4, 1),
(4, 2),
(4, 13),
(4, 20),
(4, 21);

#USUARIOS (SENHA = doggis@puc)
INSERT IGNORE INTO usuario (id_usuario, ativo, cpf, dt_inclusao, email, nome, registro, rg, senha, id_perfil) VALUES
(1, TRUE, '111.111.111-11', NOW(), 'admin@doggis.com', 'Administrador', '', '', '$2a$10$FNNqIkQyBm7RuSkmdWvxkejIPW5FiZGrvKQxa2D3IEh/iUjirgIiS', 1),
(2, TRUE, '222.222.222-22', NOW(), 'atendente@doggis.com', 'Atendente', '', '', '$2a$10$FNNqIkQyBm7RuSkmdWvxkejIPW5FiZGrvKQxa2D3IEh/iUjirgIiS', 2),
(3, TRUE, '333.333.333-33', NOW(), 'veterinario@doggis.com', 'Veterinario', '12345-6', '33.3333', '$2a$10$FNNqIkQyBm7RuSkmdWvxkejIPW5FiZGrvKQxa2D3IEh/iUjirgIiS', 3),
(4, TRUE, '444.444.444-44', NOW(), 'cliente@doggis.com', 'Cliente', '', '44.4444', '$2a$10$FNNqIkQyBm7RuSkmdWvxkejIPW5FiZGrvKQxa2D3IEh/iUjirgIiS', 4);

#PAGAMENTOS
INSERT IGNORE INTO pagamento(id_pagamento, descricao, icone, dt_inclusao) VALUES
(1, 'Dinheiro', 'icon-dinheiro', NOW()),
(2, 'Débito', 'icon-debito', NOW()),
(3, 'Crédito', 'icon-credito', NOW()),
(4, 'Boleto', 'icon-boleto', NOW());

#ESTADOS
INSERT IGNORE INTO estado (id_estado, descricao) VALUES
(1, 'Acre'),
(2, 'Alagoas'),
(3, 'Amapá'),
(4, 'Amazonas'),
(5, 'Bahia'),
(6, 'Ceará'),
(7, 'Distrito Federal'),
(8, 'Espírito Santo'),
(9, 'Goiás'),
(10, 'Maranhão'),
(11, 'Mato Grosso'),
(12, 'Mato Grosso do Sul'),
(13, 'Minas Gerais'),
(14, 'Pará'),
(15, 'Paraíba'),
(16, 'Paraná'),
(17, 'Pernambuco'),
(18, 'Piauí'),
(19, 'Rio de Janeiro'),
(20, 'Rio Grande do Norte'),
(21, 'Rio Grande do Sul'),
(22, 'Rondônia'),
(23, 'Roraima'),
(24, 'Santa Catarina'),
(25, 'São Paulo'),
(26, 'Sergipe'),
(27, 'Tocantins');

#ESPECIES
INSERT IGNORE INTO especie (id_especie, dt_inclusao, descricao, icone) VALUES
(1, NOW(), 'Cão', 'icone-cao'),
(2, NOW(), 'Gato', 'icone-gato'),
(3, NOW(), 'Ave', 'icone-ave'),
(4, NOW(), 'Peixe', 'icone-peixe'),
(5, NOW(), 'Roedor', 'icone-roedor'),
(6, NOW(), 'Anfíbio', 'icone-anfibio'),
(7, NOW(), 'Réptil', 'icone-reptil');

#RACAS · CAES
INSERT IGNORE INTO raca (dt_inclusao, id_especie, id_raca, descricao) VALUES
(NOW(), 1, 1, 'Affenpinscher'),
(NOW(), 1, 2, 'Afghan Hound'),
(NOW(), 1, 3, 'Airedale Terrier'),
(NOW(), 1, 4, 'Akita'),
(NOW(), 1, 5, 'Akita Americano'),
(NOW(), 1, 6, 'American Pit Bull Terrier'),
(NOW(), 1, 7, 'American Staffordshire Terrier'),
(NOW(), 1, 8, 'Australian Shepherd'),
(NOW(), 1, 9, 'Basenji'),
(NOW(), 1, 10, 'Basset Fulvo da Bretanha'),
(NOW(), 1, 11, 'Basset Hound'),
(NOW(), 1, 12, 'Beagle'),
(NOW(), 1, 13, 'Beagle-Harrier'),
(NOW(), 1, 14, 'Bearded Collie'),
(NOW(), 1, 15, 'Bedlington Terrier'),
(NOW(), 1, 16, 'Bernese Mountain Dog'),
(NOW(), 1, 17, 'Bichon Bolonhês'),
(NOW(), 1, 18, 'Bichon Frisé'),
(NOW(), 1, 19, 'Bichon Havanês'),
(NOW(), 1, 20, 'Boerboel'),
(NOW(), 1, 21, 'Boiadeiro de Entlebuch'),
(NOW(), 1, 22, 'Border Collie'),
(NOW(), 1, 23, 'Border Terrier'),
(NOW(), 1, 24, 'Borzoi'),
(NOW(), 1, 25, 'Boston Terrier'),
(NOW(), 1, 26, 'Bouvier de Flandres'),
(NOW(), 1, 27, 'Boxer'),
(NOW(), 1, 28, 'Braco Alemão Pelo Curto'),
(NOW(), 1, 29, 'Braco Alemão Pelo Duro'),
(NOW(), 1, 30, 'Braco Italiano'),
(NOW(), 1, 31, 'Buldogue Americano'),
(NOW(), 1, 32, 'Buldogue Francês'),
(NOW(), 1, 33, 'Buldogue Inglês'),
(NOW(), 1, 34, 'Bullmastiff'),
(NOW(), 1, 35, 'Bull Terrier'),
(NOW(), 1, 36, 'Cairn Terrier'),
(NOW(), 1, 37, 'Cane Corso'),
(NOW(), 1, 38, 'Cão D’água Espanhol'),
(NOW(), 1, 39, 'Cão D’água Português'),
(NOW(), 1, 40, 'Cão de Crista Chinês'),
(NOW(), 1, 41, 'Cão de Santo Humberto'),
(NOW(), 1, 42, 'Cão Lobo Checoslovaco'),
(NOW(), 1, 43, 'Cão Pelado Mexicano'),
(NOW(), 1, 44, 'Cão Pelado Peruano'),
(NOW(), 1, 45, 'Cavalier King Charles Spaniel'),
(NOW(), 1, 46, 'Cesky Terrier'),
(NOW(), 1, 47, 'Chesapeake Bay Retriever'),
(NOW(), 1, 48, 'Chihuahua'),
(NOW(), 1, 49, 'Chin'),
(NOW(), 1, 50, 'Chow-chow Pelo Curto'),
(NOW(), 1, 51, 'Chow-chow Pelo Longo'),
(NOW(), 1, 52, 'Cirneco do Etna'),
(NOW(), 1, 53, 'Clumber Spaniel'),
(NOW(), 1, 54, 'Cocker Spaniel Americano'),
(NOW(), 1, 55, 'Cocker Spaniel Inglês'),
(NOW(), 1, 56, 'Collie pelo longo'),
(NOW(), 1, 57, 'Coton de Tulear'),
(NOW(), 1, 58, 'Dachshund Teckel - Pelo Curto'),
(NOW(), 1, 59, 'Dálmata'),
(NOW(), 1, 60, 'Dandie Dinmont Terrier'),
(NOW(), 1, 61, 'Dobermann'),
(NOW(), 1, 62, 'Dogo Argentino'),
(NOW(), 1, 63, 'Dogo Canário'),
(NOW(), 1, 64, 'Dogue Alemão'),
(NOW(), 1, 65, 'Dogue de Bordeaux'),
(NOW(), 1, 66, 'Elkhound Norueguês Cinza'),
(NOW(), 1, 67, 'Fila Brasileiro'),
(NOW(), 1, 68, 'Flat-Coated Retriever'),
(NOW(), 1, 69, 'Foxhound Inglês'),
(NOW(), 1, 70, 'Fox Terrier Pelo Duro '),
(NOW(), 1, 71, 'Fox Terrier Pelo Liso'),
(NOW(), 1, 72, 'Galgo Espanhol'),
(NOW(), 1, 73, 'Golden Retriever'),
(NOW(), 1, 74, 'Grande Münsterländer'),
(NOW(), 1, 75, 'Greyhound'),
(NOW(), 1, 76, 'Griffon Belga'),
(NOW(), 1, 77, 'Griffon de Bruxelas'),
(NOW(), 1, 78, 'Husky Siberiano'),
(NOW(), 1, 79, 'Ibizan Hound'),
(NOW(), 1, 80, 'Irish Soft Coated Wheaten Terrier'),
(NOW(), 1, 81, 'Irish Wolfhound'),
(NOW(), 1, 82, 'Jack Russell Terrier'),
(NOW(), 1, 83, 'Kerry Blue Terrier'),
(NOW(), 1, 84, 'Komondor'),
(NOW(), 1, 85, 'Kuvasz'),
(NOW(), 1, 86, 'Labrador Retriever'),
(NOW(), 1, 87, 'Lagotto Romagnolo'),
(NOW(), 1, 88, 'Lakeland Terrier'),
(NOW(), 1, 89, 'Leonberger'),
(NOW(), 1, 90, 'Lhasa Apso'),
(NOW(), 1, 91, 'Malamute do Alasca'),
(NOW(), 1, 92, 'Maltês'),
(NOW(), 1, 93, 'Mastiff'),
(NOW(), 1, 94, 'Mastim Espanhol'),
(NOW(), 1, 95, 'Mastino Napoletano'),
(NOW(), 1, 96, 'Mudi'),
(NOW(), 1, 97, 'Nordic Spitz'),
(NOW(), 1, 98, 'Norfolk Terrier'),
(NOW(), 1, 99, 'Norwich Terrier'),
(NOW(), 1, 100, 'Old English Sheepdog'),
(NOW(), 1, 101, 'Papillon'),
(NOW(), 1, 102, 'Parson Russell Terrier'),
(NOW(), 1, 103, 'Pastor Alemão'),
(NOW(), 1, 104, 'Pastor Beauceron'),
(NOW(), 1, 105, 'Pastor Belga'),
(NOW(), 1, 106, 'Pastor Bergamasco'),
(NOW(), 1, 107, 'Pastor Branco Suíço'),
(NOW(), 1, 108, 'Pastor Briard'),
(NOW(), 1, 109, 'Pastor da Ásia Central'),
(NOW(), 1, 110, 'Pastor de Shetland'),
(NOW(), 1, 111, 'Pastor dos Pirineus'),
(NOW(), 1, 112, 'Pastor Maremano Abruzês'),
(NOW(), 1, 113, 'Pastor Polonês'),
(NOW(), 1, 114, 'Pastor Polonês da Planície'),
(NOW(), 1, 115, 'Pequeno Basset Griffon da Vendéia'),
(NOW(), 1, 116, 'Pequeno Cão Leão'),
(NOW(), 1, 117, 'Pequeno Lebrel Italiano'),
(NOW(), 1, 118, 'Pequinês'),
(NOW(), 1, 119, 'Perdigueiro Português'),
(NOW(), 1, 120, 'Petit Brabançon'),
(NOW(), 1, 121, 'Pharaoh Hound'),
(NOW(), 1, 122, 'Pinscher Miniatura'),
(NOW(), 1, 123, 'Podengo Canário'),
(NOW(), 1, 124, 'Podengo Português'),
(NOW(), 1, 125, 'Pointer Inglês'),
(NOW(), 1, 126, 'Poodle Anão'),
(NOW(), 1, 127, 'Poodle Médio'),
(NOW(), 1, 128, 'Poodle Standard'),
(NOW(), 1, 129, 'Poodle Toy'),
(NOW(), 1, 130, 'Pug'),
(NOW(), 1, 131, 'Puli'),
(NOW(), 1, 132, 'Pumi'),
(NOW(), 1, 133, 'Rhodesian Ridgeback'),
(NOW(), 1, 134, 'Rottweiler'),
(NOW(), 1, 135, 'Saluki'),
(NOW(), 1, 136, 'Samoieda'),
(NOW(), 1, 137, 'São Bernardo'),
(NOW(), 1, 138, 'Schipperke'),
(NOW(), 1, 139, 'Schnauzer'),
(NOW(), 1, 140, 'Schnauzer Gigante'),
(NOW(), 1, 141, 'Schnauzer Miniatura'),
(NOW(), 1, 142, 'Scottish Terrier'),
(NOW(), 1, 143, 'Sealyham Terrier'),
(NOW(), 1, 144, 'Setter Gordon'),
(NOW(), 1, 145, 'Setter Inglês'),
(NOW(), 1, 146, 'Setter Irlandês Vermelho'),
(NOW(), 1, 147, 'Setter Irlandês Vermelho e Branco'),
(NOW(), 1, 148, 'Shar-pei'),
(NOW(), 1, 149, 'Shiba'),
(NOW(), 1, 150, 'Shih-Tzu'),
(NOW(), 1, 151, 'Silky Terrier Australiano'),
(NOW(), 1, 152, 'Skye Terrier'),
(NOW(), 1, 153, 'Smoushond Holandês'),
(NOW(), 1, 154, 'Spaniel Bretão'),
(NOW(), 1, 155, 'Spinone Italiano'),
(NOW(), 1, 156, 'Spitz Alemão Anão'),
(NOW(), 1, 157, 'Spitz Finlandês'),
(NOW(), 1, 158, 'Spitz Japonês Anão'),
(NOW(), 1, 159, 'Springer Spaniel Inglês'),
(NOW(), 1, 160, 'Stabyhoun'),
(NOW(), 1, 161, 'Staffordshire Bull Terrier'),
(NOW(), 1, 162, 'Terra Nova'),
(NOW(), 1, 163, 'Terrier Alemão de caça Jagd'),
(NOW(), 1, 164, 'Terrier Brasileiro'),
(NOW(), 1, 165, 'Terrier Irlandês de Glen do Imaal'),
(NOW(), 1, 166, 'Terrier Preto da Rússia'),
(NOW(), 1, 167, 'Tibetan Terrier'),
(NOW(), 1, 168, 'Tosa Inu'),
(NOW(), 1, 169, 'Vira-Latas'),
(NOW(), 1, 170, 'Vizsla'),
(NOW(), 1, 171, 'Volpino Italiano'),
(NOW(), 1, 172, 'Weimaraner'),
(NOW(), 1, 173, 'Welsh Corgi Cardigan'),
(NOW(), 1, 174, 'Welsh Corgi Pembroke'),
(NOW(), 1, 175, 'Welsh Springer Spaniel'),
(NOW(), 1, 176, 'Welsh Terrier'),
(NOW(), 1, 177, 'West Highland White Terrier'),
(NOW(), 1, 178, 'Whippet'),
(NOW(), 1, 179, 'Yorkshire Terrier');

#RACA · GATOS
INSERT IGNORE INTO raca (dt_inclusao, id_especie, id_raca, descricao) VALUES
(NOW(), 2, 180, 'Abyssinian'),
(NOW(), 2, 181, 'American Bobtail Longhair'),
(NOW(), 2, 182, 'American Bobtail Shorthair'),
(NOW(), 2, 183, 'American Shorthair'),
(NOW(), 2, 184, 'American Wirehair'),
(NOW(), 2, 185, 'Arabian Mau'),
(NOW(), 2, 186, 'Asian Semi-long Hair'),
(NOW(), 2, 187, 'Australian Mist'),
(NOW(), 2, 188, 'Bengal'),
(NOW(), 2, 189, 'Bobtail Japonês'),
(NOW(), 2, 190, 'Bombaim'),
(NOW(), 2, 191, 'Brazilian Shorthair'),
(NOW(), 2, 192, 'British Longhair'),
(NOW(), 2, 193, 'Burmês'),
(NOW(), 2, 194, 'California Spangled Cat'),
(NOW(), 2, 195, 'Chausie'),
(NOW(), 2, 196, 'Cornish Rex'),
(NOW(), 2, 197, 'Curl Americano Pelo Curto'),
(NOW(), 2, 198, 'Curl Americano Pelo Longo'),
(NOW(), 2, 199, 'Cymric'),
(NOW(), 2, 200, 'Devon Rex'),
(NOW(), 2, 201, 'Domestic Long-Haired'),
(NOW(), 2, 202, 'Domestic Short-Haired'),
(NOW(), 2, 203, 'Don Sphynx'),
(NOW(), 2, 204, 'Egyptian Mau'),
(NOW(), 2, 205, 'European'),
(NOW(), 2, 206, 'Exotic Shorthair'),
(NOW(), 2, 207, 'German Rex'),
(NOW(), 2, 208, 'Havana'),
(NOW(), 2, 209, 'Himalaio'),
(NOW(), 2, 210, 'Khao Manee'),
(NOW(), 2, 211, 'Korat'),
(NOW(), 2, 212, 'Kurilian Bobtail Longhair'),
(NOW(), 2, 213, 'Kurilian Bobtail Shorthair'),
(NOW(), 2, 214, 'LaPerm Longhair'),
(NOW(), 2, 215, 'LaPerm Shorthair'),
(NOW(), 2, 216, 'Maine Coon'),
(NOW(), 2, 217, 'Manx'),
(NOW(), 2, 218, 'Mekong Bobtail'),
(NOW(), 2, 219, 'Munchkin Longhair'),
(NOW(), 2, 220, 'Munchkin Shorthair'),
(NOW(), 2, 221, 'Nebelung'),
(NOW(), 2, 222, 'Norwegian Forest Cat'),
(NOW(), 2, 223, 'Ocicat'),
(NOW(), 2, 224, 'Ojos Azules Shorthair'),
(NOW(), 2, 225, 'Oriental Longhair'),
(NOW(), 2, 226, 'Oriental Shorthair'),
(NOW(), 2, 227, 'Persa'),
(NOW(), 2, 228, 'Peterbald'),
(NOW(), 2, 229, 'Pixiebob Longhair'),
(NOW(), 2, 230, 'Pixiebob Shorthair'),
(NOW(), 2, 231, 'Ragamuffin'),
(NOW(), 2, 232, 'Ragdoll'),
(NOW(), 2, 233, 'Russo Azul'),
(NOW(), 2, 234, 'Sagrado da Birmânia'),
(NOW(), 2, 235, 'Savannah Cat'),
(NOW(), 2, 236, 'Scottish Fold'),
(NOW(), 2, 237, 'Selkirk Rex Longhair'),
(NOW(), 2, 238, 'Selkirk Rex Shorthair'),
(NOW(), 2, 239, 'Serengeti'),
(NOW(), 2, 240, 'Siamês'),
(NOW(), 2, 241, 'Siberian'),
(NOW(), 2, 242, 'Singapura'),
(NOW(), 2, 243, 'Snowshoe'),
(NOW(), 2, 244, 'Sokoke'),
(NOW(), 2, 245, 'Somali'),
(NOW(), 2, 246, 'Sphynx'),
(NOW(), 2, 247, 'Thai'),
(NOW(), 2, 248, 'Tonkinese Shorthair'),
(NOW(), 2, 249, 'Toyger'),
(NOW(), 2, 250, 'Turkish Angorá'),
(NOW(), 2, 251, 'Turkish Van'),
(NOW(), 2, 252, 'York Chocolate');

#RACAS · AVES
INSERT IGNORE INTO raca (dt_inclusao, id_especie, id_raca, descricao) VALUES
(NOW(), 3, 253, 'Agapornis'),
(NOW(), 3, 254, 'Cacatua'),
(NOW(), 3, 255, 'Calopsita'),
(NOW(), 3, 256, 'Canário'),
(NOW(), 3, 257, 'Lóris'),
(NOW(), 3, 258, 'Papagaio'),
(NOW(), 3, 259, 'Periquito');

#RACAS · PEIXES
INSERT IGNORE INTO raca (dt_inclusao, id_especie, id_raca, descricao) VALUES
(NOW(), 4, 260, 'Acará bandeira (Pterophyllum scalare)'),
(NOW(), 4, 261, 'Acará disco (Symphysodon sp.)'),
(NOW(), 4, 262, 'Barbo sumatrano (Capoeta tetrazona)'),
(NOW(), 4, 263, 'Beijador (Helostoma temmincki)'),
(NOW(), 4, 264, 'Betta ou peixe de briga (Betta splendens)'),
(NOW(), 4, 265, 'Borboleta (Gasteropelecus sternicla)'),
(NOW(), 4, 266, 'Botia palhaço (Botia macracantha)'),
(NOW(), 4, 267, 'Chilodus (Chilodus punctatus)'),
(NOW(), 4, 268, 'Colisa (Colisa lalia)'),
(NOW(), 4, 269, 'Coridora ou Limpa-fundo (Corydoras aeneus)'),
(NOW(), 4, 270, 'Espada (Xiphophorus helleri)'),
(NOW(), 4, 271, 'Guppy ou Lebiste (Poecilia reticulata)'),
(NOW(), 4, 272, 'Japonês (Carassius auratus)'),
(NOW(), 4, 273, 'Limpa-vidro (Othocinclus vestitus)'),
(NOW(), 4, 274, 'Molinésia (Poecilia latipinna)'),
(NOW(), 4, 275, 'Neon cardinal ou Tetra cardinal (Paracheirodon axelrodi)'),
(NOW(), 4, 276, 'Pangássius (Pangasius sutchi)'),
(NOW(), 4, 277, 'Paulistinha (Brachydanio rerio)'),
(NOW(), 4, 278, 'Platy (Xiphophorus maculatus)'),
(NOW(), 4, 279, 'Ramirezi (Microgeophagus ramirezi)'),
(NOW(), 4, 280, 'Rodóstomo (Hemigrammus rhodostomus)'),
(NOW(), 4, 281, 'Tetra preto (Gymnocorymbus ternetzi)'),
(NOW(), 4, 282, 'Tricogaster Leeri (Trichogaster Leeri)');

# FABRICANTES
INSERT IGNORE INTO fabricante (id_fabricante, nome, dt_inclusao) VALUES
(1,'Agener',NOW()),
(2,'AgroDog',NOW()),
(3,'Alcon',NOW()),
(4,'All Love',NOW()),
(5,'Allerless',NOW()),
(6,'Amici',NOW()),
(7,'Animalíssimo',NOW()),
(8,'Avert',NOW()),
(9,'Avitrin',NOW()),
(10,'Bayer',NOW()),
(11,'Bellokão',NOW()),
(12,'Bichinho Chic',NOW()),
(13,'BioFlorais',NOW()),
(14,'Biofresh',NOW()),
(15,'Biowash',NOW()),
(16,'Cat Chow',NOW()),
(17,'Cat Excellence',NOW()),
(18,'Chalesco',NOW()),
(19,'Champ',NOW()),
(20,'Cibau',NOW()),
(21,'Collie',NOW()),
(22,'Cotlín',NOW()),
(23,'Coveli',NOW()),
(24,'Dan Dog',NOW()),
(25,'Danreal',NOW()),
(26,'Docg',NOW()),
(27,'Dog Chow',NOW()),
(28,'Dog Excellence',NOW()),
(29,'Dog Lar',NOW()),
(30,'Dogs Care',NOW()),
(31,'Duprat',NOW()),
(32,'Ecopet Natural',NOW()),
(33,'Empóriopet',NOW()),
(34,'Equilíbrio',NOW()),
(35,'Eukanuba',NOW()),
(36,'Faro',NOW()),
(37,'Fofuchos',NOW()),
(38,'Furminator',NOW()),
(39,'GermanHart',NOW()),
(40,'Golden',NOW()),
(41,'Gran Plus',NOW()),
(42,'Guabi Natural',NOW()),
(43,'Heroi',NOW()),
(44,'Hills',NOW()),
(45,'HomePet',NOW()),
(46,'Ibasa',NOW()),
(47,'Inovet',NOW()),
(48,'Jambo',NOW()),
(49,'JBL',NOW()),
(50,'KDog',NOW()),
(51,'Konig',NOW()),
(52,'Labyes',NOW()),
(53,'Matacura',NOW()),
(54,'Matisse',NOW()),
(55,'Max',NOW()),
(56,'Mega Food',NOW()),
(57,'Megazoo',NOW()),
(58,'Mersey',NOW()),
(59,'Mon Ami',NOW()),
(60,'Mundo Animal',NOW()),
(61,'N&D',NOW()),
(62,'Naturalis',NOW()),
(63,'Nero',NOW()),
(64,'Nutral',NOW()),
(65,'Nutravit',NOW()),
(66,'Nutripássaros',NOW()),
(67,'Nutrópica',NOW()),
(68,'Nylabone',NOW()),
(69,'Odontopet',NOW()),
(70,'Optimum',NOW()),
(71,'Origens',NOW()),
(72,'Ourofino',NOW()),
(73,'Pássaro Forte',NOW()),
(74,'Pedigree',NOW()),
(75,'Pet Care',NOW()),
(76,'Pet Clean',NOW()),
(77,'Pet Flex',NOW()),
(78,'Pet Food Solution',NOW()),
(79,'Pet Minato',NOW()),
(80,'Pet Society',NOW()),
(81,'PetBamboo',NOW()),
(82,'Petbrilho',NOW()),
(83,'Pethy Group',NOW()),
(84,'Petix',NOW()),
(85,'PetLab',NOW()),
(86,'Petlon',NOW()),
(87,'Poytara',NOW()),
(88,'Premier',NOW()),
(89,'Presence',NOW()),
(90,'Preserva Mundi',NOW()),
(91,'Pro Plan',NOW()),
(92,'Procão',NOW()),
(93,'Propovets',NOW()),
(94,'Provets',NOW()),
(95,'PuraPet',NOW()),
(96,'Qualiday',NOW()),
(97,'Royal Canin',NOW()),
(98,'Sanol',NOW()),
(99,'São Francisco',NOW()),
(100,'Sempre Vita',NOW()),
(101,'Sera',NOW()),
(102,'Slick',NOW()),
(103,'Stilber',NOW()),
(104,'Tetra',NOW()),
(105,'Tibii',NOW()),
(106,'Tropiclean',NOW()),
(107,'Truqys Pets',NOW()),
(108,'TudoPet',NOW()),
(109,'Univet',NOW()),
(110,'Vet+20',NOW()),
(111,'Vetbras',NOW()),
(112,'Vetfleur',NOW()),
(113,'Vetnil',NOW()),
(114,'Virbac',NOW()),
(115,'Vitale',NOW()),
(116,'Weasy',NOW()),
(117,'Western Pet',NOW()),
(118,'Whiskas',NOW()),
(119,'World Veterinária',NOW());

# CATEGORIAS
INSERT IGNORE INTO categoria (id_categoria, descricao, dt_inclusao) VALUES
(1,'Adestramento',NOW()),
(2,'Almofada',NOW()),
(3,'Analgésicos',NOW()),
(4,'Anti Estressante',NOW()),
(5,'Anti Inflamatório',NOW()),
(6,'Anti Sépticos e Desinfetantes',NOW()),
(7,'Antiacidos/ Inibidores HCL',NOW()),
(8,'Antialérgico',NOW()),
(9,'Antibiótico',NOW()),
(10,'Anticoncepcionais',NOW()),
(11,'Antidiarreicos',NOW()),
(12,'Antieméticos',NOW()),
(13,'Antihipertensivos',NOW()),
(14,'Antipulgas',NOW()),
(15,'Antitóxicos',NOW()),
(16,'Banheiras',NOW()),
(17,'Banho Seco',NOW()),
(18,'Bebedouros',NOW()),
(19,'Bica Pedra',NOW()),
(20,'Caminhas',NOW()),
(21,'Capas',NOW()),
(22,'Cicatrizantes',NOW()),
(23,'Colar Cervical',NOW()),
(24,'Colar Elizabetano',NOW()),
(25,'Colchões',NOW()),
(26,'Colchonetes',NOW()),
(27,'Coleira Anti Latido',NOW()),
(28,'Coletor de Fezes',NOW()),
(29,'Colônia',NOW()),
(30,'Comedouros',NOW()),
(31,'Condicionador',NOW()),
(32,'Cortador de Unhas',NOW()),
(33,'Creme Hidratante',NOW()),
(34,'Educador e Repelente',NOW()),
(35,'Eliminador de Odores',NOW()),
(36,'Escadas',NOW()),
(37,'Escovas Rasqueadeiras',NOW()),
(38,'Expectorante',NOW()),
(39,'Fralda',NOW()),
(40,'Gaiolas e Viveiros',NOW()),
(41,'Higiene Bucal',NOW()),
(42,'Homeopáticos',NOW()),
(43,'Lenços Higienicos',NOW()),
(44,'Limpeza de Olhos',NOW()),
(45,'Limpeza de Ouvido',NOW()),
(46,'Ninhos',NOW()),
(47,'Pedestal',NOW()),
(48,'Poleiros',NOW()),
(49,'Porta Ração',NOW()),
(50,'Probióticos',NOW()),
(51,'Protetor de Patas',NOW()),
(52,'Ração Medicamentosa',NOW()),
(53,'Ração Seca',NOW()),
(54,'Rações Úmidas Latas Sachês',NOW()),
(55,'Regenerador Articular',NOW()),
(56,'Regulador de Cio',NOW()),
(57,'Repelentes Cães',NOW()),
(58,'Roupa pós Cirúrgica',NOW()),
(59,'Sabão Sabonetes',NOW()),
(60,'Sarnicidas',NOW()),
(61,'Seca Xixi',NOW()),
(62,'Shampoo',NOW()),
(63,'Shampoo Medicamentoso',NOW()),
(64,'Tapete Higiênico',NOW()),
(65,'Transporte',NOW()),
(66,'Tratamento Dentário',NOW()),
(67,'Vermifugo',NOW()),
(68,'Vitaminas e Suplementos',NOW());

