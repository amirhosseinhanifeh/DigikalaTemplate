using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class grfhnjkdhhgg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "tbl_BlogComments");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "tbl_BlogComments");

            migrationBuilder.DropColumn(
                name: "Mobile",
                table: "tbl_BlogComments");

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "tbl_BlogComments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_BlogComments_UserId",
                table: "tbl_BlogComments",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_BlogComments_tbl_Users_UserId",
                table: "tbl_BlogComments",
                column: "UserId",
                principalTable: "tbl_Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_BlogComments_tbl_Users_UserId",
                table: "tbl_BlogComments");

            migrationBuilder.DropIndex(
                name: "IX_tbl_BlogComments_UserId",
                table: "tbl_BlogComments");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "tbl_BlogComments");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "tbl_BlogComments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "tbl_BlogComments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Mobile",
                table: "tbl_BlogComments",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
