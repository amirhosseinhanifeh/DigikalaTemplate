using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ALO.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddBank : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "BankId",
                table: "tbl_Orders",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tbl_Banks",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BankType = table.Column<int>(type: "int", nullable: false),
                    MerchantId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaymentUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SandBoxUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsSandbox = table.Column<bool>(type: "bit", nullable: false),
                    Createdby = table.Column<long>(type: "bigint", nullable: true),
                    Modifiedby = table.Column<long>(type: "bigint", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Banks", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2024, 6, 27, 12, 52, 6, 97, DateTimeKind.Local).AddTicks(424));

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Orders_BankId",
                table: "tbl_Orders",
                column: "BankId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Orders_tbl_Banks_BankId",
                table: "tbl_Orders",
                column: "BankId",
                principalTable: "tbl_Banks",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Orders_tbl_Banks_BankId",
                table: "tbl_Orders");

            migrationBuilder.DropTable(
                name: "tbl_Banks");

            migrationBuilder.DropIndex(
                name: "IX_tbl_Orders_BankId",
                table: "tbl_Orders");

            migrationBuilder.DropColumn(
                name: "BankId",
                table: "tbl_Orders");

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 12, 11, 22, 42, 46, 242, DateTimeKind.Local).AddTicks(3841));
        }
    }
}
