using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class asddddsdddddfdffggghffggghghh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UserAddressId",
                table: "tbl_Orders",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tbl_UserAddresses",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mobile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Lat = table.Column<double>(type: "float", nullable: false),
                    Long = table.Column<double>(type: "float", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_tbl_UserAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_UserAddresses_tbl_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "tbl_Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Orders_UserAddressId",
                table: "tbl_Orders",
                column: "UserAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_UserAddresses_UserId",
                table: "tbl_UserAddresses",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Orders_tbl_UserAddresses_UserAddressId",
                table: "tbl_Orders",
                column: "UserAddressId",
                principalTable: "tbl_UserAddresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Orders_tbl_UserAddresses_UserAddressId",
                table: "tbl_Orders");

            migrationBuilder.DropTable(
                name: "tbl_UserAddresses");

            migrationBuilder.DropIndex(
                name: "IX_tbl_Orders_UserAddressId",
                table: "tbl_Orders");

            migrationBuilder.DropColumn(
                name: "UserAddressId",
                table: "tbl_Orders");
        }
    }
}
