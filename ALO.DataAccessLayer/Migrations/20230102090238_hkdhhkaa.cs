using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class hkdhhkaa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductPriceHistory_tbl_Colors_ColorId",
                table: "tbl_ProductPriceHistory");

            migrationBuilder.AlterColumn<long>(
                name: "ColorId",
                table: "tbl_ProductPriceHistory",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<long>(
                name: "ProductGuaranteeId",
                table: "tbl_ProductPriceHistory",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tbl_ProductGuarantee",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createdby = table.Column<long>(type: "bigint", nullable: true),
                    Modifiedby = table.Column<long>(type: "bigint", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_ProductGuarantee", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_ProductPriceOption",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductCategoryId = table.Column<long>(type: "bigint", nullable: true),
                    SubProductCategoryId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createdby = table.Column<long>(type: "bigint", nullable: true),
                    Modifiedby = table.Column<long>(type: "bigint", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_ProductPriceOption", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_ProductPriceOption_tbl_ProductCategories_ProductCategoryId",
                        column: x => x.ProductCategoryId,
                        principalTable: "tbl_ProductCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_tbl_ProductPriceOption_tbl_ProductCategories_SubProductCategoryId",
                        column: x => x.SubProductCategoryId,
                        principalTable: "tbl_ProductCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "tbl_ProductPriceOptionValue",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductId = table.Column<long>(type: "bigint", nullable: true),
                    ProductPriceOptionId = table.Column<long>(type: "bigint", nullable: false),
                    Createdby = table.Column<long>(type: "bigint", nullable: true),
                    Modifiedby = table.Column<long>(type: "bigint", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_ProductPriceOptionValue", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_ProductPriceOptionValue_tbl_ProductPriceOption_ProductPriceOptionId",
                        column: x => x.ProductPriceOptionId,
                        principalTable: "tbl_ProductPriceOption",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_ProductPriceOptionValue_tbl_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "tbl_Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "tbl_ProductPriceHistoryOptionValues",
                columns: table => new
                {
                    ProductPriceHistoriesId = table.Column<long>(type: "bigint", nullable: false),
                    ProductPriceOptionValuesId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_ProductPriceHistoryOptionValues", x => new { x.ProductPriceHistoriesId, x.ProductPriceOptionValuesId });
                    table.ForeignKey(
                        name: "FK_tbl_ProductPriceHistoryOptionValues_tbl_ProductPriceHistory_ProductPriceHistoriesId",
                        column: x => x.ProductPriceHistoriesId,
                        principalTable: "tbl_ProductPriceHistory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_ProductPriceHistoryOptionValues_tbl_ProductPriceOptionValue_ProductPriceOptionValuesId",
                        column: x => x.ProductPriceOptionValuesId,
                        principalTable: "tbl_ProductPriceOptionValue",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductPriceHistory_ProductGuaranteeId",
                table: "tbl_ProductPriceHistory",
                column: "ProductGuaranteeId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductPriceHistoryOptionValues_ProductPriceOptionValuesId",
                table: "tbl_ProductPriceHistoryOptionValues",
                column: "ProductPriceOptionValuesId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductPriceOption_ProductCategoryId",
                table: "tbl_ProductPriceOption",
                column: "ProductCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductPriceOption_SubProductCategoryId",
                table: "tbl_ProductPriceOption",
                column: "SubProductCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductPriceOptionValue_ProductId",
                table: "tbl_ProductPriceOptionValue",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductPriceOptionValue_ProductPriceOptionId",
                table: "tbl_ProductPriceOptionValue",
                column: "ProductPriceOptionId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductPriceHistory_tbl_Colors_ColorId",
                table: "tbl_ProductPriceHistory",
                column: "ColorId",
                principalTable: "tbl_Colors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductPriceHistory_tbl_ProductGuarantee_ProductGuaranteeId",
                table: "tbl_ProductPriceHistory",
                column: "ProductGuaranteeId",
                principalTable: "tbl_ProductGuarantee",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductPriceHistory_tbl_Colors_ColorId",
                table: "tbl_ProductPriceHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductPriceHistory_tbl_ProductGuarantee_ProductGuaranteeId",
                table: "tbl_ProductPriceHistory");

            migrationBuilder.DropTable(
                name: "tbl_ProductGuarantee");

            migrationBuilder.DropTable(
                name: "tbl_ProductPriceHistoryOptionValues");

            migrationBuilder.DropTable(
                name: "tbl_ProductPriceOptionValue");

            migrationBuilder.DropTable(
                name: "tbl_ProductPriceOption");

            migrationBuilder.DropIndex(
                name: "IX_tbl_ProductPriceHistory_ProductGuaranteeId",
                table: "tbl_ProductPriceHistory");

            migrationBuilder.DropColumn(
                name: "ProductGuaranteeId",
                table: "tbl_ProductPriceHistory");

            migrationBuilder.AlterColumn<long>(
                name: "ColorId",
                table: "tbl_ProductPriceHistory",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductPriceHistory_tbl_Colors_ColorId",
                table: "tbl_ProductPriceHistory",
                column: "ColorId",
                principalTable: "tbl_Colors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
