"use client";

import React, { useState } from "react";
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import { Kn } from "@/models/Kn";
import knJson from "@/csvjson.json";
import { Box, Link, List, ListItem, ListItemText, Tab, Tabs, TextField, Typography } from "@mui/material";

export default function DataGridKn() {
	const [data, setData] = useState<Kn[]>(knJson);
	const [tabIndex, setTabIndex] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");

	const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
		setTabIndex(newIndex);
		setSearchQuery("");
	};

	const filteredData = data.filter((row) => {
		const searchLower = searchQuery.toLowerCase();

		return (
			row.cadastralNumber.toLowerCase().includes(searchLower) ||
			row.jurisdiction.toLowerCase().includes(searchLower) ||
			row.type.toLowerCase().includes(searchLower) ||
			row.addressSource.toLowerCase().includes(searchLower) ||
			row.addressNormalized.toLowerCase().includes(searchLower) ||
			row.yandexMark.toLowerCase().includes(searchLower) ||
			row.encumbrances.toString().includes(searchLower)
		);
	});

	const columns: GridColDef[] = [
		{ field: "cadastralNumber", headerName: "КН", flex: 1, sortable: true, maxWidth: 160 },
		{ field: "jurisdiction", headerName: "Подвед", flex: 1, minWidth: 200, sortable: true },
		{ field: "type", headerName: "Тип", flex: 1, sortable: true, maxWidth: 140 },
		{
			field: "addressSource",
			headerName: "Адрес исходный",
			flex: 1,
			sortable: true,
			renderCell: (params) => (
				<div dangerouslySetInnerHTML={{ __html: params.value.replace(/\r\n/g, "<br />") }} />
			),
		},
		{ field: "addressNormalized", headerName: "Адрес нормализованный", flex: 1, sortable: true },
		{
			field: "yandexMark",
			headerName: "Метки яндекса",
			flex: 1,
			sortable: true,
			renderCell: (params) => (
				<div dangerouslySetInnerHTML={{ __html: params.value.replace(/\r\n/g, "<br />") }} />
			),
		},
		{ field: "countYandexMark", headerName: "Σ", maxWidth: 60, flex: 1, sortable: true },
		{ field: "encumbrances", headerName: "Обременения по РФС АПК", flex: 1, sortable: true, maxWidth: 260 },
		{ field: "countEncumbrances", headerName: "Σ", maxWidth: 60, flex: 1, sortable: true },
	];

	const rows: GridRowsProp = data.map((row, index) => ({
		id: index,
		cadastralNumber: row.cadastralNumber,
		jurisdiction: row.jurisdiction,
		type: row.type,
		addressSource: row.addressSource,
		addressNormalized: row.addressNormalized,
		yandexMark: row.yandexMark,
		countYandexMark: row.countYandexMark,
		encumbrances: row.encumbrances,
		countEncumbrances: row.countEncumbrances,
	}));

	return (
		<div style={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs value={tabIndex} onChange={handleTabChange} aria-label="tabs example">
					<Tab label="Все" />
					<Tab label="Поиск" />
					<Tab label="Справка по экспорту" />
				</Tabs>
			</Box>

			{tabIndex === 0 && (
				<>
					<DataGrid
						sx={{
							height: "95vh",
						}}
						slots={{ toolbar: GridToolbar }}
						rows={rows}
						columns={columns}
						rowHeight={100}
						initialState={{
							pagination: {
								paginationModel: { pageSize: 30 },
							},
						}}
						getRowHeight={() => "auto"}
						autosizeOptions={{
							includeOutliers: true,
							includeHeaders: false,
						}}
						scrollbarSize={10}
					/>
				</>
			)}

			{tabIndex === 1 && (
				<div style={{ padding: 20, textAlign: "center" }}>
					<TextField
						label="Поиск"
						variant="outlined"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						fullWidth
						margin="normal"
					/>
					{searchQuery && filteredData.length === 0 ? (
						<Typography variant="h6">Нет данных, соответствующих запросу</Typography>
					) : (
						<div style={{ height: "83vh", width: "100%" }}>
							{filteredData.length === 0 || !searchQuery ? (
								<Typography variant="h6" style={{ textAlign: "center", marginTop: "20px" }}>
									Начните поиск
								</Typography>
							) : (
								<DataGrid
									rows={filteredData.map((row, index) => ({
										id: index,
										cadastralNumber: row.cadastralNumber,
										jurisdiction: row.jurisdiction,
										type: row.type,
										addressSource: row.addressSource,
										addressNormalized: row.addressNormalized,
										yandexMark: row.yandexMark,
										countYandexMark: row.countYandexMark,
										encumbrances: row.encumbrances,
										countEncumbrances: row.countEncumbrances,
									}))}
									columns={columns}
									initialState={{
										pagination: {
											paginationModel: { pageSize: 30 },
										},
									}}
									slots={{ toolbar: GridToolbar }}
									getRowHeight={() => "auto"}
									autosizeOptions={{
										includeOutliers: true,
										includeHeaders: false,
									}}
									scrollbarSize={10}
								/>
							)}
						</div>
					)}
				</div>
			)}

			{tabIndex === 2 && (
				<Box sx={{ backgroundColor: "#f9f9f9", border: "1px solid #ddd", borderRadius: 2, p: 2, mt: 2 }}>
					<Typography variant="h6" gutterBottom>
						Экспорт файлов происходит в формате CSV. Инструкция по открытию:
					</Typography>
					<List>
						<ListItem>
							<ListItemText primary="1. Открыть или создать новый файл в Excel, в меню выбрать Data - Get Data" />
						</ListItem>
						<ListItem>
							<ListItemText primary="2. В разделе Get Data выбрать From Text" />
						</ListItem>
						<ListItem>
							<ListItemText primary="3. Выбрать файл, который нужно открыть в Excel, и нажать Get Data" />
						</ListItem>
						<ListItem>
							<ListItemText primary="4. На этом шаге выбрать Delimited и File origin: Unicode (UTF-8), затем нажать Next" />
						</ListItem>
						<ListItem>
							<ListItemText primary="5. На втором шаге отметить Comma и нажать Next" />
						</ListItem>
						<ListItem>
							<ListItemText primary="6. Выбрать желаемый формат данных и нажать Finish" />
						</ListItem>
					</List>
					<Typography variant="body1">
						или перейдите в&nbsp;
						<Link
							href="https://workspace.google.com/products/sheets/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Google Sheets
						</Link>
						&nbsp; и загрузите файл
					</Typography>
				</Box>
			)}
		</div>
	);
}
