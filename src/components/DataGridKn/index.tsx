"use client";

import React, { useState } from "react";
import {
	DataGrid,
	GridColDef,
	GridRowsProp,
	GridToolbar,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import { Kn } from "@/models/Kn";
import knJson from "@/csvjson.json";
import { Box, Tab, Tabs, TextField, Typography } from "@mui/material";

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
			row.podved.toLowerCase().includes(searchLower) ||
			row.address.toLowerCase().includes(searchLower) ||
			row.type.toLowerCase().includes(searchLower) ||
			row.kn.toLowerCase().includes(searchLower) ||
			row.addressNorm.toLowerCase().includes(searchLower) ||
			row.yandexMark.toLowerCase().includes(searchLower) ||
			row.rentalInformation.toLowerCase().includes(searchLower) ||
			row.sum1.toString().includes(searchLower) ||
			row.sum2.toString().includes(searchLower)
		);
	});

	const columns: GridColDef[] = [
		{ field: "id", headerName: "№", flex: 1, maxWidth: 80, sortable: true },
		{ field: "podved", headerName: "Подвед", flex: 1, minWidth: 200, sortable: true },
		{ field: "address", headerName: "Адрес исходный", flex: 1, sortable: true },
		{ field: "type", headerName: "Тип", flex: 1, sortable: true },
		{ field: "kn", headerName: "КН", flex: 1, sortable: true },
		{ field: "addressNorm", headerName: "Адрес нормализованный", flex: 1, sortable: true },
		{ field: "yandexMark", headerName: "Метки яндекса (100)", flex: 1, sortable: true },
		{ field: "sum1", headerName: "Σ", maxWidth: 40, flex: 1, sortable: true },
		{ field: "rentalInformation", headerName: "Обременения по РФС АПК (73)", flex: 1, sortable: true },
		{ field: "sum2", headerName: "Σ", maxWidth: 40, flex: 1, sortable: true },
	];

	const rows: GridRowsProp = data.map((row) => ({
		id: row.id,
		podved: row.podved,
		address: row.address,
		type: row.type,
		kn: row.kn,
		addressNorm: row.addressNorm,
		yandexMark: row.yandexMark,
		sum1: row.sum1,
		rentalInformation: row.rentalInformation,
		sum2: row.sum2,
	}));

	return (
		<div style={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs value={tabIndex} onChange={handleTabChange} aria-label="tabs example">
					<Tab label="Все" />
					<Tab label="Поиск" />
				</Tabs>
			</Box>

			{tabIndex === 0 ? (
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
			) : (
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
						<div style={{ height: 500, width: "100%" }}>
							{filteredData.length === 0 || !searchQuery ? (
								<Typography variant="h6" style={{ textAlign: "center", marginTop: "20px" }}>
									Начните поиск
								</Typography>
							) : (
								<DataGrid
									rows={filteredData.map((row) => ({
										id: row.id,
										podved: row.podved,
										address: row.address,
										type: row.type,
										kn: row.kn,
										addressNorm: row.addressNorm,
										yandexMark: row.yandexMark,
										sum1: row.sum1,
										rentalInformation: row.rentalInformation,
										sum2: row.sum2,
									}))}
									columns={columns}
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
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
