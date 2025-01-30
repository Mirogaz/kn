import { Box, Link, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

export default function Reference() {
	return (
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
				<Link href="https://workspace.google.com/products/sheets/" target="_blank" rel="noopener noreferrer">
					Google Sheets
				</Link>
				&nbsp; и загрузите файл
			</Typography>
		</Box>
	);
}
