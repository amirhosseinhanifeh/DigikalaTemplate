using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class dfssflkds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDefault",
                table: "tbl_UserAddresses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Pelak",
                table: "tbl_UserAddresses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Vahed",
                table: "tbl_UserAddresses",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDefault",
                table: "tbl_UserAddresses");

            migrationBuilder.DropColumn(
                name: "Pelak",
                table: "tbl_UserAddresses");

            migrationBuilder.DropColumn(
                name: "Vahed",
                table: "tbl_UserAddresses");
        }
    }
}
