using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DeliveryApp.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SenderCity = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    SenderAddress = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    ReceiverCity = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    ReceiverAddress = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Weight = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    PickupDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    OrderNumber = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");
        }
    }
}
