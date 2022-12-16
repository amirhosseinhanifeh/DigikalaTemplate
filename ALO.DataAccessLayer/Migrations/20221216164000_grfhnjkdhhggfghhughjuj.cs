using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class grfhnjkdhhggfghhughjuj : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "tbl_ProductComments");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "tbl_ProductComments");

            migrationBuilder.DropColumn(
                name: "Mobile",
                table: "tbl_ProductComments");

            migrationBuilder.AddColumn<long>(
                name: "ProductCommentId",
                table: "tbl_ProductComments",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "tbl_ProductComments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "BlogCommentId",
                table: "tbl_BlogComments",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductComments_ProductCommentId",
                table: "tbl_ProductComments",
                column: "ProductCommentId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductComments_UserId",
                table: "tbl_ProductComments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_BlogComments_BlogCommentId",
                table: "tbl_BlogComments",
                column: "BlogCommentId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_BlogComments_tbl_BlogComments_BlogCommentId",
                table: "tbl_BlogComments",
                column: "BlogCommentId",
                principalTable: "tbl_BlogComments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductComments_tbl_ProductComments_ProductCommentId",
                table: "tbl_ProductComments",
                column: "ProductCommentId",
                principalTable: "tbl_ProductComments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductComments_tbl_Users_UserId",
                table: "tbl_ProductComments",
                column: "UserId",
                principalTable: "tbl_Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_BlogComments_tbl_BlogComments_BlogCommentId",
                table: "tbl_BlogComments");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductComments_tbl_ProductComments_ProductCommentId",
                table: "tbl_ProductComments");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductComments_tbl_Users_UserId",
                table: "tbl_ProductComments");

            migrationBuilder.DropIndex(
                name: "IX_tbl_ProductComments_ProductCommentId",
                table: "tbl_ProductComments");

            migrationBuilder.DropIndex(
                name: "IX_tbl_ProductComments_UserId",
                table: "tbl_ProductComments");

            migrationBuilder.DropIndex(
                name: "IX_tbl_BlogComments_BlogCommentId",
                table: "tbl_BlogComments");

            migrationBuilder.DropColumn(
                name: "ProductCommentId",
                table: "tbl_ProductComments");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "tbl_ProductComments");

            migrationBuilder.DropColumn(
                name: "BlogCommentId",
                table: "tbl_BlogComments");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "tbl_ProductComments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "tbl_ProductComments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Mobile",
                table: "tbl_ProductComments",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
