using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class hkdhhkaaffd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductPriceHistory_tbl_ProductGuarantee_ProductGuaranteeId",
                table: "tbl_ProductPriceHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductPriceHistoryOptionValues_tbl_ProductPriceOptionValue_ProductPriceOptionValuesId",
                table: "tbl_ProductPriceHistoryOptionValues");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductPriceOption_tbl_ProductCategories_ProductCategoryId",
                table: "tbl_ProductPriceOption");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductPriceOption_tbl_ProductCategories_SubProductCategoryId",
                table: "tbl_ProductPriceOption");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductPriceOptionValue_tbl_ProductPriceOption_ProductPriceOptionId",
                table: "tbl_ProductPriceOptionValue");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductPriceOptionValue_tbl_Products_ProductId",
                table: "tbl_ProductPriceOptionValue");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_ProductPriceOptionValue",
                table: "tbl_ProductPriceOptionValue");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_ProductPriceOption",
                table: "tbl_ProductPriceOption");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_ProductGuarantee",
                table: "tbl_ProductGuarantee");

            migrationBuilder.RenameTable(
                name: "tbl_ProductPriceOptionValue",
                newName: "tbl_ProductPriceOptionValues");

            migrationBuilder.RenameTable(
                name: "tbl_ProductPriceOption",
                newName: "tbl_ProductPriceOptions");

            migrationBuilder.RenameTable(
                name: "tbl_ProductGuarantee",
                newName: "tbl_ProductGuarantees");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_ProductPriceOptionValue_ProductPriceOptionId",
                table: "tbl_ProductPriceOptionValues",
                newName: "IX_tbl_ProductPriceOptionValues_ProductPriceOptionId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_ProductPriceOptionValue_ProductId",
                table: "tbl_ProductPriceOptionValues",
                newName: "IX_tbl_ProductPriceOptionValues_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_ProductPriceOption_SubProductCategoryId",
                table: "tbl_ProductPriceOptions",
                newName: "IX_tbl_ProductPriceOptions_SubProductCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_ProductPriceOption_ProductCategoryId",
                table: "tbl_ProductPriceOptions",
                newName: "IX_tbl_ProductPriceOptions_ProductCategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_ProductPriceOptionValues",
                table: "tbl_ProductPriceOptionValues",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_ProductPriceOptions",
                table: "tbl_ProductPriceOptions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_ProductGuarantees",
                table: "tbl_ProductGuarantees",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductPriceHistory_tbl_ProductGuarantees_ProductGuaranteeId",
                table: "tbl_ProductPriceHistory",
                column: "ProductGuaranteeId",
                principalTable: "tbl_ProductGuarantees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductPriceHistoryOptionValues_tbl_ProductPriceOptionValues_ProductPriceOptionValuesId",
                table: "tbl_ProductPriceHistoryOptionValues",
                column: "ProductPriceOptionValuesId",
                principalTable: "tbl_ProductPriceOptionValues",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductPriceOptions_tbl_ProductCategories_ProductCategoryId",
                table: "tbl_ProductPriceOptions",
                column: "ProductCategoryId",
                principalTable: "tbl_ProductCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductPriceOptions_tbl_ProductCategories_SubProductCategoryId",
                table: "tbl_ProductPriceOptions",
                column: "SubProductCategoryId",
                principalTable: "tbl_ProductCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductPriceOptionValues_tbl_ProductPriceOptions_ProductPriceOptionId",
                table: "tbl_ProductPriceOptionValues",
                column: "ProductPriceOptionId",
                principalTable: "tbl_ProductPriceOptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductPriceOptionValues_tbl_Products_ProductId",
                table: "tbl_ProductPriceOptionValues",
                column: "ProductId",
                principalTable: "tbl_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductPriceHistory_tbl_ProductGuarantees_ProductGuaranteeId",
                table: "tbl_ProductPriceHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductPriceHistoryOptionValues_tbl_ProductPriceOptionValues_ProductPriceOptionValuesId",
                table: "tbl_ProductPriceHistoryOptionValues");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductPriceOptions_tbl_ProductCategories_ProductCategoryId",
                table: "tbl_ProductPriceOptions");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductPriceOptions_tbl_ProductCategories_SubProductCategoryId",
                table: "tbl_ProductPriceOptions");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductPriceOptionValues_tbl_ProductPriceOptions_ProductPriceOptionId",
                table: "tbl_ProductPriceOptionValues");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductPriceOptionValues_tbl_Products_ProductId",
                table: "tbl_ProductPriceOptionValues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_ProductPriceOptionValues",
                table: "tbl_ProductPriceOptionValues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_ProductPriceOptions",
                table: "tbl_ProductPriceOptions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_ProductGuarantees",
                table: "tbl_ProductGuarantees");

            migrationBuilder.RenameTable(
                name: "tbl_ProductPriceOptionValues",
                newName: "tbl_ProductPriceOptionValue");

            migrationBuilder.RenameTable(
                name: "tbl_ProductPriceOptions",
                newName: "tbl_ProductPriceOption");

            migrationBuilder.RenameTable(
                name: "tbl_ProductGuarantees",
                newName: "tbl_ProductGuarantee");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_ProductPriceOptionValues_ProductPriceOptionId",
                table: "tbl_ProductPriceOptionValue",
                newName: "IX_tbl_ProductPriceOptionValue_ProductPriceOptionId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_ProductPriceOptionValues_ProductId",
                table: "tbl_ProductPriceOptionValue",
                newName: "IX_tbl_ProductPriceOptionValue_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_ProductPriceOptions_SubProductCategoryId",
                table: "tbl_ProductPriceOption",
                newName: "IX_tbl_ProductPriceOption_SubProductCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_ProductPriceOptions_ProductCategoryId",
                table: "tbl_ProductPriceOption",
                newName: "IX_tbl_ProductPriceOption_ProductCategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_ProductPriceOptionValue",
                table: "tbl_ProductPriceOptionValue",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_ProductPriceOption",
                table: "tbl_ProductPriceOption",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_ProductGuarantee",
                table: "tbl_ProductGuarantee",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductPriceHistory_tbl_ProductGuarantee_ProductGuaranteeId",
                table: "tbl_ProductPriceHistory",
                column: "ProductGuaranteeId",
                principalTable: "tbl_ProductGuarantee",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductPriceHistoryOptionValues_tbl_ProductPriceOptionValue_ProductPriceOptionValuesId",
                table: "tbl_ProductPriceHistoryOptionValues",
                column: "ProductPriceOptionValuesId",
                principalTable: "tbl_ProductPriceOptionValue",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductPriceOption_tbl_ProductCategories_ProductCategoryId",
                table: "tbl_ProductPriceOption",
                column: "ProductCategoryId",
                principalTable: "tbl_ProductCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductPriceOption_tbl_ProductCategories_SubProductCategoryId",
                table: "tbl_ProductPriceOption",
                column: "SubProductCategoryId",
                principalTable: "tbl_ProductCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductPriceOptionValue_tbl_ProductPriceOption_ProductPriceOptionId",
                table: "tbl_ProductPriceOptionValue",
                column: "ProductPriceOptionId",
                principalTable: "tbl_ProductPriceOption",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductPriceOptionValue_tbl_Products_ProductId",
                table: "tbl_ProductPriceOptionValue",
                column: "ProductId",
                principalTable: "tbl_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
