using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class AddWallet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_Wallets",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    Createdby = table.Column<long>(type: "bigint", nullable: true),
                    Modifiedby = table.Column<long>(type: "bigint", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Wallets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_Wallets_tbl_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "tbl_Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tbl_WalletHistories",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    WalletId = table.Column<long>(type: "bigint", nullable: false),
                    Createdby = table.Column<long>(type: "bigint", nullable: true),
                    Modifiedby = table.Column<long>(type: "bigint", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_WalletHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_WalletHistories_tbl_Wallets_WalletId",
                        column: x => x.WalletId,
                        principalTable: "tbl_Wallets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 7, 23, 14, 47, 36, 534, DateTimeKind.Local).AddTicks(9026));

            migrationBuilder.CreateIndex(
                name: "IX_tbl_WalletHistories_WalletId",
                table: "tbl_WalletHistories",
                column: "WalletId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Wallets_UserId",
                table: "tbl_Wallets",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_WalletHistories");

            migrationBuilder.DropTable(
                name: "tbl_Wallets");

            migrationBuilder.UpdateData(
                table: "tbl_Languages",
                keyColumn: "Id",
                keyValue: 3L,
                column: "CreatedDate",
                value: new DateTime(2023, 7, 23, 11, 22, 19, 303, DateTimeKind.Local).AddTicks(2742));
        }
    }
}
