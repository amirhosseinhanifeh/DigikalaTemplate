
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

GO
SET IDENTITY_INSERT [tbl_Menus] ON 
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (1, N'کاربران سایت', NULL, N'/Admin/Users/Index', 1, 8, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (2, N'لیست وبلاگ', NULL, N'/Admin/Blog/Index', 1, 19, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (3, N'مدیریت شبکه های اجتماعی', NULL, N'/Admin/SocialNetwork/Index', 3, 13, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (4, N'لیست سفارشات', NULL, N'/Admin/Order/Index', 1, 18, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (5, N'مدیریت نظرات', NULL, N'/Admin/BlogComment/Index', 2, 19, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (6, N'مدیریت نقش ها', NULL, N'/Admin/Roles/Index', 2, 8, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (7, N'مدیریت صفحات متنی', NULL, N'/Admin/PageContent/Index', 1, 13, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (8, N'مدیریت کاربران', NULL, N'#', 2, NULL, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (9, N'مدیریت سئو صفحه اول', NULL, N'/Admin/Seo/Index', 4, 13, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (10, N'مدیریت تماس با ما', NULL, N'/Admin/ContactUs/Index', 2, 13, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (11, N'مدیریت نظرات', NULL, N'/Admin/ProductComment/Index', 6, 12, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (12, N'مدیریت محصولات', NULL, N'#', 3, NULL, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (13, N'محتوای سایت', NULL, N'#', 4, NULL, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (14, N'مدیریت فرم ها', NULL, N'#', 5, NULL, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (15, N'مدیریت فرم تماس با ما', NULL, N'/Admin/FormContactUs/Index', 1, 14, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (16, N'گروه محصولات', NULL, N'/Admin/ProductCategory/Index', 2, 12, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (17, N'داشبورد', NULL, N'/Admin', 1, NULL, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (18, N'مدیریت سفارشات', NULL, N'#', 6, NULL, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (19, N'مدیریت وبلاگ', NULL, N'#', 2, NULL, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (20, N'لیست محصولات', NULL, N'/Admin/Product/Index', 5, 12, NULL, NULL, NULL, CAST(N'1399-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (22, N'زیر دسته محصولات', NULL, N'/Admin/ProductSubCategory/Index', 3, 12, NULL, NULL, NULL, CAST(N'2020-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (23, N'مدیریت برند ها', NULL, N'/Admin/Brand/Index', 4, 12, NULL, NULL, NULL, CAST(N'2020-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (24, N'مدیریت بلوک ها', NULL, N'/Admin/Block/Index', 4, 13, NULL, NULL, NULL, CAST(N'2020-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (25, N'مدیریت لینک', NULL, N'#', 7, NULL, NULL, NULL, NULL, CAST(N'2020-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (26, N'گروه لینکها', NULL, N'/Admin/GroupLinkManagement/Index', 1, 25, NULL, NULL, NULL, CAST(N'2020-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (28, N'لینک ها', NULL, N'/Admin/LinkManagement/Index', 2, 25, NULL, NULL, NULL, CAST(N'2020-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (29, N'مدیریت اسلاید شو', NULL, N'/Admin/SlideShow/Index', 5, 13, NULL, NULL, NULL, CAST(N'2020-01-01T04:30:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (30, N'ابزار ها', NULL, N'/Admin/Tool', 6, 13, NULL, NULL, NULL, CAST(N'2020-01-01T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (31, N'مدیریت ارسال', NULL, N'/Admin/DeliveryPrice', 17, 18, NULL, NULL, NULL, CAST(N'2023-01-10T00:00:00.0000000' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (32, N'دسته بندی', NULL, N'/Admin/BlogCategory/Index', 3, 19, NULL, NULL, NULL, CAST(N'2024-06-25T21:48:36.2079097' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (33, N'سوالات متداول', NULL, N'/Admin/Faq', 8, 13, NULL, NULL, NULL, CAST(N'2024-06-27T12:02:54.4523310' AS DateTime2), 0, 1)
GO
INSERT [tbl_Menus] ([Id], [Name], [Icon], [Link], [Order], [ParentId], [Createdby], [Modifiedby], [ModifiedDate], [CreatedDate], [IsDelete], [IsActive]) VALUES (34, N'دسته اصلی', NULL, N'/Admin/MainProductCategory', 1, 12, NULL, NULL, NULL, CAST(N'2024-06-27T12:04:03.1446017' AS DateTime2), 0, 1)
GO
SET IDENTITY_INSERT [tbl_Menus] OFF
GO
ALTER TABLE [tbl_Menus]  WITH CHECK ADD  CONSTRAINT [FK_tbl_Menus_tbl_Menus_ParentId] FOREIGN KEY([ParentId])
REFERENCES [tbl_Menus] ([Id])
GO
ALTER TABLE [tbl_Menus] CHECK CONSTRAINT [FK_tbl_Menus_tbl_Menus_ParentId]
GO
