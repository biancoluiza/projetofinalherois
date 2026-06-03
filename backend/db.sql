create database portal;
use portal;

create table usuarios (
    id_usuario int not null auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(50) not null
);

create table guildas (
    id_guildas int not null auto_increment primary key,
    nome varchar(100) not null,
    descrição varchar(250) not null
);

create table herois (
    id_herois int not null auto_increment primary key,
    nome varchar(100) not null,
    classe varchar(20) not null,
    poder varchar(20) not null,

    id_guildas int not null,
    id_usuarios int not null,

    foreign key (id_guildas) references guildas (id_guildas),
    foreign key (id_usuarios) references usuarios (id_usuarios),
);

create table missoes (
    id_missoes int not null auto_increment primary key,
    descrição varchar(250) not null,
    status enum('Em andamento', 'Concluída', 'Falhou') not null,

    id_herois int not null,

    foreign key (id_herois) references herois (id_herois)
);