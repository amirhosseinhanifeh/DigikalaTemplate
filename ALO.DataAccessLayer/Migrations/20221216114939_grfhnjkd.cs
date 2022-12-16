using Microsoft.EntityFrameworkCore.Migrations;

namespace ALO.DataAccessLayer.Migrations
{
    public partial class grfhnjkd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_UserInRole");

            migrationBuilder.CreateTable(
                name: "tbl_UserInRoles",
                columns: table => new
                {
                    RolesId = table.Column<long>(type: "bigint", nullable: false),
                    UsersId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_UserInRoles", x => new { x.RolesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_tbl_UserInRoles_tbl_Role_RolesId",
                        column: x => x.RolesId,
                        principalTable: "tbl_Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_UserInRoles_tbl_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "tbl_Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_UserInRoles_UsersId",
                table: "tbl_UserInRoles",
                column: "UsersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_UserInRoles");

            migrationBuilder.CreateTable(
                name: "tbl_UserInRole",
                columns: table => new
                {
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    RoleId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_UserInRole", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_tbl_UserInRole_tbl_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "tbl_Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_UserInRole_tbl_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "tbl_Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_UserInRole_RoleId",
                table: "tbl_UserInRole",
                column: "RoleId");
        }
    }
}
