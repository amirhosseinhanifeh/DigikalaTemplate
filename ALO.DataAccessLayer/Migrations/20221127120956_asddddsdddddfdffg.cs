using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class asddddsdddddfdffg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Colors_tbl_SubProductCategories_SubProductCategoryId",
                table: "tbl_Colors");

            migrationBuilder.DropIndex(
                name: "IX_tbl_Colors_SubProductCategoryId",
                table: "tbl_Colors");

            migrationBuilder.DropColumn(
                name: "SubProductCategoryId",
                table: "tbl_Colors");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "SubProductCategoryId",
                table: "tbl_Colors",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Colors_SubProductCategoryId",
                table: "tbl_Colors",
                column: "SubProductCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Colors_tbl_SubProductCategories_SubProductCategoryId",
                table: "tbl_Colors",
                column: "SubProductCategoryId",
                principalTable: "tbl_SubProductCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
