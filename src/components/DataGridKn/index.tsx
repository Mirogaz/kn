"use client";

import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import { Kn } from "@/models/Kn";
import { Box, Button, Tab, Tabs, TextField, Typography } from "@mui/material";
import { ruRU } from "@mui/x-data-grid/locales";
import axios from "axios";
import Reference from "@components/Reference";

export default function DataGridKn() {
	const [data, setData] = useState<Kn[]>([]);
	const [file, setFiles] = useState<string[]>([]);
	const [fileNameSelected, setFileNameSelected] = useState<{
		index: number;
		name: string;
	}>();
	const [tabIndex, setTabIndex] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const fetchFiles = async () => {
			try {
				const response = await axios.get("/api/json-file");
				setFiles(response.data.files);
			} catch (error) {
				console.error("Error fetching files:", error);
			}
		};

		fetchFiles();
	}, []);

	const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
		setTabIndex(newIndex);
		setSearchQuery("");
	};

	const selectedFile = async (fileName: string, index: number) => {
		setFileNameSelected({
			index: index,
			name: fileName,
		});
		const { data } = await axios.get(`/api/file/${fileName}`);
		setData(JSON.parse(data.content));
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
					<Tab label="Поиск" />
					<Tab label="Все" />
					<Tab label="Справка по экспорту" />
				</Tabs>
			</Box>

			{tabIndex !== 2 && (
				<Box sx={{ p: 2 }}>
					<Typography variant="h6" gutterBottom>
						Files in json directory
					</Typography>
					<Typography variant="body1" gutterBottom>
						Всего файлов: {file.length}
					</Typography>
					<Typography variant="body1" gutterBottom>
						Выбранный файл: {fileNameSelected?.name || "-"}
					</Typography>
					<Box sx={{ gap: 2, display: "flex" }}>
						{file.map((name, index) => (
							<Button
								key={index}
								variant="contained"
								disabled={index === fileNameSelected?.index}
								onClick={() => selectedFile(name, index)}
							>
								{name}
							</Button>
						))}
					</Box>
				</Box>
			)}

			{tabIndex === 0 && (
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
									localeText={ruRU.components.MuiDataGrid.defaultProps?.localeText}
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
			{tabIndex === 1 && (
				<>
					<DataGrid
						localeText={ruRU.components.MuiDataGrid.defaultProps?.localeText}
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
			{tabIndex === 2 && <Reference />}
		</div>
	);
}
