create database portal;
use portal;

create table usuarios (
    id_usuario int not null auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(255) not null
);

create table guildas (
    id_guilda int not null auto_increment primary key,
    nome varchar(100) not null,
    descricao varchar(250) not null
);

create table herois (
    id_heroi int not null auto_increment primary key,
    nome varchar(100) not null,
    classe varchar(20) not null,
    poder int not null,
    avatar_url varchar(255) not null,

    id_guilda int not null,
    id_usuario int not null,

    foreign key (id_guilda) references guildas (id_guilda),
    foreign key (id_usuario) references usuarios (id_usuario)
);

create table missoes (
    id_missao int not null auto_increment primary key,
    descricao varchar(250) not null,
    recompensa_ouro int not null,
    status enum('Em andamento', 'Concluida', 'Falhou') not null,

    id_heroi int not null,

    foreign key (id_heroi) references herois (id_heroi)
);

insert into usuarios (nome, email, senha)
values
('Luiza', 'luiza@email.com', '123456');

insert into guildas (nome, descricao)
values
('Ordem Arcana', 'Guilda especializada em magia'),
('Legiao de Ferro', 'Guerreiros de elite');

insert into herois (nome, classe, poder, avatar_url, id_guilda, id_usuario)
values
('Mercúrio','Mago', 95,'https://avatar.com/mercurio.png', 1, 1);

insert into missoes (descricao, recompensa_ouro, status, id_heroi)
values
('Eliminar goblins da floresta', 500, 'Em andamento', 1);