import React from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/styles";

const Apple = (props) => (
	<svg
		width={20}
		height={20}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}>
		<path
			d='M18.144 15.586a10.843 10.843 0 0 1-1.085 1.933c-.57.807-1.038 1.365-1.398 1.674-.558.509-1.156.77-1.797.784-.46 0-1.014-.13-1.659-.392-.647-.262-1.242-.392-1.786-.392-.571 0-1.183.13-1.837.392-.656.263-1.184.4-1.588.413-.614.026-1.226-.242-1.837-.805-.39-.337-.878-.914-1.462-1.733-.627-.874-1.142-1.888-1.546-3.043-.432-1.248-.649-2.457-.649-3.627 0-1.34.292-2.496.878-3.465a5.125 5.125 0 0 1 1.838-1.842A4.979 4.979 0 0 1 6.7 4.788c.488 0 1.127.15 1.922.443.793.295 1.302.444 1.525.444.166 0 .732-.175 1.69-.523.907-.323 1.671-.457 2.298-.404 1.698.135 2.974.799 3.822 1.994-1.518.912-2.27 2.189-2.255 3.827.014 1.276.481 2.338 1.4 3.181a4.6 4.6 0 0 0 1.397.909c-.112.322-.23.63-.356.927ZM14.249.4c0 1-.368 1.934-1.103 2.799-.887 1.027-1.96 1.621-3.124 1.527A3.09 3.09 0 0 1 10 4.347c0-.96.422-1.987 1.17-2.828.375-.425.85-.779 1.427-1.061.576-.278 1.12-.432 1.632-.458.015.134.021.267.021.4Z'
			fill='#000'
		/>
	</svg>
);

const Google = (props) => (
	<svg
		width={20}
		height={20}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}>
		<g clipPath='url(#a)' fillRule='evenodd' clipRule='evenodd'>
			<path
				d='M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35Z'
				fill='#4285F4'
			/>
			<path
				d='M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0 0 10 20Z'
				fill='#34A853'
			/>
			<path
				d='M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 0 0 0 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59Z'
				fill='#FBBC05'
			/>
			<path
				d='M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.696 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.192 5.736 7.396 3.977 10 3.977Z'
				fill='#EA4335'
			/>
		</g>
		<defs>
			<clipPath id='a'>
				<path fill='#fff' d='M0 0h20v20H0z' />
			</clipPath>
		</defs>
	</svg>
);

const Facebuck = (props) => (
	<svg
		width={20}
		height={20}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}>
		<rect width={20} height={20} rx={10} fill='#fff' />
		<path
			d='m13.893 12.89.443-2.89h-2.774V8.125c0-.791.387-1.563 1.63-1.563h1.261v-2.46s-1.144-.196-2.238-.196c-2.285 0-3.777 1.385-3.777 3.89V10h-2.54v2.89h2.54v6.989a10.058 10.058 0 0 0 3.124 0V12.89h2.33Z'
			fill='#1877F2'
		/>
	</svg>
);
const SocialIcon = styled(Box)(({ theme }) => ({
	borderRadius: 50,
	margin: theme.spacing(0, 1),
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: 40,
	height: 40,
	backgroundColor: theme.palette.background.light,
	[theme.breakpoints.up("sm")]: {
		margin: theme.spacing(0, 2),
	},
}));
export default () => {
	const size = {
		width: "45px",
		height: "45px",
	};
	return (
		<Box
			pt={3}
			bgcolor='primary.main'
			display={"flex"}
			justifyContent={"space-around"}
			alignItems={"center"}>
			<SocialIcon>
				<Facebuck />
			</SocialIcon>
			<SocialIcon>
				<Apple />
			</SocialIcon>
			<SocialIcon>
				<Google />
			</SocialIcon>
		</Box>
	);
};
