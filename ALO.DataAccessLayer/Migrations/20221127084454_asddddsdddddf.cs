using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class asddddsdddddf : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_BasketOrderProducts_tbl_Products_ProductId",
                table: "tbl_BasketOrderProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_OrderDetails_tbl_Products_ProductId",
                table: "tbl_OrderDetails");

            migrationBuilder.DropIndex(
                name: "IX_tbl_OrderDetails_ProductId",
                table: "tbl_OrderDetails");

            migrationBuilder.DropColumn(
                name: "Cost",
                table: "tbl_Products");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "tbl_OrderDetails");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "tbl_OrderDetails",
                newName: "ProducPriceHistoryId");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "tbl_BasketOrderProducts",
                newName: "ProductPriceHistoryId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_BasketOrderProducts_ProductId",
                table: "tbl_BasketOrderProducts",
                newName: "IX_tbl_BasketOrderProducts_ProductPriceHistoryId");

            migrationBuilder.AddColumn<long>(
                name: "ProductPriceHistoryId",
                table: "tbl_OrderDetails",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "tbl_ProductId",
                table: "tbl_OrderDetails",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tbl_ProductPriceHistory",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ColorId = table.Column<long>(type: "bigint", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Inventory = table.Column<int>(type: "int", nullable: false),
                    DiscountPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ProductId = table.Column<long>(type: "bigint", nullable: false),
                    Createdby = table.Column<long>(type: "bigint", nullable: true),
                    Modifiedby = table.Column<long>(type: "bigint", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_ProductPriceHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_ProductPriceHistory_tbl_Colors_ColorId",
                        column: x => x.ColorId,
                        principalTable: "tbl_Colors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_ProductPriceHistory_tbl_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "tbl_Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_OrderDetails_ProductPriceHistoryId",
                table: "tbl_OrderDetails",
                column: "ProductPriceHistoryId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_OrderDetails_tbl_ProductId",
                table: "tbl_OrderDetails",
                column: "tbl_ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductPriceHistory_ColorId",
                table: "tbl_ProductPriceHistory",
                column: "ColorId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductPriceHistory_ProductId",
                table: "tbl_ProductPriceHistory",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_BasketOrderProducts_tbl_ProductPriceHistory_ProductPriceHistoryId",
                table: "tbl_BasketOrderProducts",
                column: "ProductPriceHistoryId",
                principalTable: "tbl_ProductPriceHistory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_OrderDetails_tbl_ProductPriceHistory_ProductPriceHistoryId",
                table: "tbl_OrderDetails",
                column: "ProductPriceHistoryId",
                principalTable: "tbl_ProductPriceHistory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_OrderDetails_tbl_Products_tbl_ProductId",
                table: "tbl_OrderDetails",
                column: "tbl_ProductId",
                principalTable: "tbl_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_BasketOrderProducts_tbl_ProductPriceHistory_ProductPriceHistoryId",
                table: "tbl_BasketOrderProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_OrderDetails_tbl_ProductPriceHistory_ProductPriceHistoryId",
                table: "tbl_OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_OrderDetails_tbl_Products_tbl_ProductId",
                table: "tbl_OrderDetails");

            migrationBuilder.DropTable(
                name: "tbl_ProductPriceHistory");

            migrationBuilder.DropIndex(
                name: "IX_tbl_OrderDetails_ProductPriceHistoryId",
                table: "tbl_OrderDetails");

            migrationBuilder.DropIndex(
                name: "IX_tbl_OrderDetails_tbl_ProductId",
                table: "tbl_OrderDetails");

            migrationBuilder.DropColumn(
                name: "ProductPriceHistoryId",
                table: "tbl_OrderDetails");

            migrationBuilder.DropColumn(
                name: "tbl_ProductId",
                table: "tbl_OrderDetails");

            migrationBuilder.RenameColumn(
                name: "ProducPriceHistoryId",
                table: "tbl_OrderDetails",
                newName: "ProductId");

            migrationBuilder.RenameColumn(
                name: "ProductPriceHistoryId",
                table: "tbl_BasketOrderProducts",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_BasketOrderProducts_ProductPriceHistoryId",
                table: "tbl_BasketOrderProducts",
                newName: "IX_tbl_BasketOrderProducts_ProductId");

            migrationBuilder.AddColumn<decimal>(
                name: "Cost",
                table: "tbl_Products",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "tbl_OrderDetails",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_OrderDetails_ProductId",
                table: "tbl_OrderDetails",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_BasketOrderProducts_tbl_Products_ProductId",
                table: "tbl_BasketOrderProducts",
                column: "ProductId",
                principalTable: "tbl_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_OrderDetails_tbl_Products_ProductId",
                table: "tbl_OrderDetails",
                column: "ProductId",
                principalTable: "tbl_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
