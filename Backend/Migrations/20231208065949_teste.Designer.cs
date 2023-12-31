﻿// <auto-generated />
using Backend.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(LabSchoolContext))]
    [Migration("20231208065949_teste")]
    partial class teste
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Backend.Models.Atendimento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Aluno_Id")
                        .HasColumnType("int");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("VARCHAR");

                    b.Property<int>("Pedagogo_Id")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Aluno_Id");

                    b.HasIndex("Pedagogo_Id");

                    b.ToTable("Atendimentos");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Aluno_Id = 1,
                            Data = "10/10/2023",
                            Descricao = "DESCRICAO EXERCICIO TESTE",
                            Pedagogo_Id = 3
                        });
                });

            modelBuilder.Entity("Backend.Models.Avaliacao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Aluno_Id")
                        .HasColumnType("int");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Materia")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("VARCHAR");

                    b.Property<double>("Nota")
                        .HasColumnType("float");

                    b.Property<double>("Pontuacao_Maxima")
                        .HasColumnType("float");

                    b.Property<int>("Professor_Id")
                        .HasColumnType("int");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("VARCHAR");

                    b.HasKey("Id");

                    b.HasIndex("Aluno_Id");

                    b.HasIndex("Professor_Id");

                    b.ToTable("Avaliacoes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Aluno_Id = 1,
                            Data = "10/10/2023",
                            Descricao = "DESCRICAO EXERCICIO TESTE",
                            Materia = "TESTE",
                            Nota = 0.0,
                            Pontuacao_Maxima = 0.0,
                            Professor_Id = 2,
                            Titulo = "EXERCICIO TESTE"
                        });
                });

            modelBuilder.Entity("Backend.Models.Empresa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Demais_Infos")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Logotipo_URL")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Nome_Empresa")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Paleta_Cores")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Slogan")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("VARCHAR");

                    b.HasKey("Id");

                    b.ToTable("Empresas");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Demais_Infos = "",
                            Logotipo_URL = "../../../../assets/toolbar/logo.png",
                            Nome_Empresa = "LabSchool",
                            Paleta_Cores = "RGB",
                            Slogan = "A melhor educação"
                        });
                });

            modelBuilder.Entity("Backend.Models.Exercicio", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Aluno_Id")
                        .HasColumnType("int");

                    b.Property<string>("Data_Conclusao")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Materia")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("VARCHAR");

                    b.Property<int>("Professor_Id")
                        .HasColumnType("int");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("VARCHAR");

                    b.HasKey("Id");

                    b.HasIndex("Aluno_Id");

                    b.HasIndex("Professor_Id");

                    b.ToTable("Exercicios");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Aluno_Id = 1,
                            Data_Conclusao = "10/10/2023",
                            Descricao = "DESCRICAO EXERCICIO TESTE",
                            Materia = "TESTE",
                            Professor_Id = 2,
                            Titulo = "EXERCICIO TESTE"
                        });
                });

            modelBuilder.Entity("Backend.Models.Log", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Acao")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Tipo")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("VARCHAR");

                    b.Property<int>("Usuario_Id")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Usuario_Id");

                    b.ToTable("Logs");
                });

            modelBuilder.Entity("Backend.Models.Login", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("VARCHAR");

                    b.HasKey("Id");

                    b.ToTable("Logins");
                });

            modelBuilder.Entity("Backend.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Bairro")
                        .IsRequired()
                        .HasMaxLength(65)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("CEP")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("CPF")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Codigo_Registro_Professor")
                        .HasMaxLength(15)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Complemento")
                        .HasMaxLength(60)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("VARCHAR");

                    b.Property<int>("Empresa_Id")
                        .HasColumnType("int");

                    b.Property<string>("Genero")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Localidade")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Logradouro")
                        .IsRequired()
                        .HasMaxLength(55)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Matricula_Aluno")
                        .HasMaxLength(15)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Numero")
                        .IsRequired()
                        .HasMaxLength(8)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("VARCHAR");

                    b.Property<bool>("Status_Sistema")
                        .HasColumnType("bit");

                    b.Property<string>("Telefone")
                        .IsRequired()
                        .HasMaxLength(16)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("Tipo")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("VARCHAR");

                    b.Property<string>("UF")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("VARCHAR");

                    b.HasKey("Id");

                    b.HasIndex("Empresa_Id");

                    b.ToTable("Usuarios");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Bairro = "Bairro",
                            CEP = "88053505",
                            CPF = "999.999.999-99",
                            Codigo_Registro_Professor = "",
                            Complemento = "Complemento",
                            Email = "email@gmail.com",
                            Empresa_Id = 1,
                            Genero = "Masculino",
                            Localidade = "Floripa",
                            Logradouro = "Rua do Senai",
                            Matricula_Aluno = "",
                            Nome = "ALUNO TESTE",
                            Numero = "222",
                            Senha = "12345678",
                            Status_Sistema = true,
                            Telefone = "(99) 9 9999-9999",
                            Tipo = "Aluno",
                            UF = "SC"
                        },
                        new
                        {
                            Id = 2,
                            Bairro = "Bairro",
                            CEP = "88053505",
                            CPF = "999.999.999-99",
                            Codigo_Registro_Professor = "",
                            Complemento = "Complemento",
                            Email = "email@gmail.com",
                            Empresa_Id = 1,
                            Genero = "Masculino",
                            Localidade = "Floripa",
                            Logradouro = "Rua do Senai",
                            Matricula_Aluno = "",
                            Nome = "PROFESSOR TESTE",
                            Numero = "222",
                            Senha = "12345678",
                            Status_Sistema = true,
                            Telefone = "(99) 9 9999-9999",
                            Tipo = "Professor",
                            UF = "SC"
                        },
                        new
                        {
                            Id = 3,
                            Bairro = "Bairro",
                            CEP = "88053505",
                            CPF = "999.999.999-99",
                            Codigo_Registro_Professor = "",
                            Complemento = "Complemento",
                            Email = "email@gmail.com",
                            Empresa_Id = 1,
                            Genero = "Masculino",
                            Localidade = "Floripa",
                            Logradouro = "Rua do Senai",
                            Matricula_Aluno = "",
                            Nome = "PEDAGOGO TESTE",
                            Numero = "222",
                            Senha = "12345678pd",
                            Status_Sistema = true,
                            Telefone = "(99) 9 9999-9999",
                            Tipo = "Pedagogo",
                            UF = "SC"
                        },
                        new
                        {
                            Id = 4,
                            Bairro = "Bairro",
                            CEP = "88053505",
                            CPF = "999.999.999-99",
                            Codigo_Registro_Professor = "",
                            Complemento = "Complemento",
                            Email = "email@gmail.com",
                            Empresa_Id = 1,
                            Genero = "Masculino",
                            Localidade = "Floripa",
                            Logradouro = "Rua do Senai",
                            Matricula_Aluno = "",
                            Nome = "ADMINISTRADOR TESTE",
                            Numero = "222",
                            Senha = "12345678admin",
                            Status_Sistema = true,
                            Telefone = "(99) 9 9999-9999",
                            Tipo = "Administrador",
                            UF = "SC"
                        });
                });

            modelBuilder.Entity("Backend.Models.Atendimento", b =>
                {
                    b.HasOne("Backend.Models.Usuario", "Aluno")
                        .WithMany("Atendimentos_Alunos")
                        .HasForeignKey("Aluno_Id")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Backend.Models.Usuario", "Pedagogo")
                        .WithMany("Atendimentos_Pedagogos")
                        .HasForeignKey("Pedagogo_Id")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Aluno");

                    b.Navigation("Pedagogo");
                });

            modelBuilder.Entity("Backend.Models.Avaliacao", b =>
                {
                    b.HasOne("Backend.Models.Usuario", "Aluno")
                        .WithMany("Avaliacoes_Alunos")
                        .HasForeignKey("Aluno_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Models.Usuario", "Professor")
                        .WithMany("Avaliacoes_Professores")
                        .HasForeignKey("Professor_Id")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Aluno");

                    b.Navigation("Professor");
                });

            modelBuilder.Entity("Backend.Models.Exercicio", b =>
                {
                    b.HasOne("Backend.Models.Usuario", "Aluno")
                        .WithMany("Exercicios_Alunos")
                        .HasForeignKey("Aluno_Id")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Backend.Models.Usuario", "Professor")
                        .WithMany("Exercicios_Professores")
                        .HasForeignKey("Professor_Id")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Aluno");

                    b.Navigation("Professor");
                });

            modelBuilder.Entity("Backend.Models.Log", b =>
                {
                    b.HasOne("Backend.Models.Usuario", "Usuario")
                        .WithMany("Logs")
                        .HasForeignKey("Usuario_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("Backend.Models.Usuario", b =>
                {
                    b.HasOne("Backend.Models.Empresa", "Empresa")
                        .WithMany("Usuarios")
                        .HasForeignKey("Empresa_Id")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Empresa");
                });

            modelBuilder.Entity("Backend.Models.Empresa", b =>
                {
                    b.Navigation("Usuarios");
                });

            modelBuilder.Entity("Backend.Models.Usuario", b =>
                {
                    b.Navigation("Atendimentos_Alunos");

                    b.Navigation("Atendimentos_Pedagogos");

                    b.Navigation("Avaliacoes_Alunos");

                    b.Navigation("Avaliacoes_Professores");

                    b.Navigation("Exercicios_Alunos");

                    b.Navigation("Exercicios_Professores");

                    b.Navigation("Logs");
                });
#pragma warning restore 612, 618
        }
    }
}
