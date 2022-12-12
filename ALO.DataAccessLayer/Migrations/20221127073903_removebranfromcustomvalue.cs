using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class removebranfromcustomvalue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductCustomFieldValues_tbl_Brands_BrandId",
                table: "tbl_ProductCustomFieldValues");

            migrationBuilder.DropIndex(
                name: "IX_tbl_ProductCustomFieldValues_BrandId",
                table: "tbl_ProductCustomFieldValues");

            migrationBuilder.DropColumn(
                name: "BrandId",
                table: "tbl_ProductCustomFieldValues");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "BrandId",
                table: "tbl_ProductCustomFieldValues",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductCustomFieldValues_BrandId",
                table: "tbl_ProductCustomFieldValues",
                column: "BrandId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductCustomFieldValues_tbl_Brands_BrandId",
                table: "tbl_ProductCustomFieldValues",
                column: "BrandId",
                principalTable: "tbl_Brands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
