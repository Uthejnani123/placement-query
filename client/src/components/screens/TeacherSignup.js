import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
const TeacherSignUp = () => {
	const history = useHistory();
	const [name, setName] = useState("");
	const [password, setPasword] = useState("");
	const [teacherId, setTeacherId] = useState("");
	const [teacherNumber, setTeacherNumber] = useState("");
	const [teacherDepartment, setTeacherDepartment] = useState("");
	const [email, setEmail] = useState("");
	const [image, setImage] = useState("");
	const [url, setUrl] = useState(undefined);
	useEffect(() => {
		if (url) {
			uploadFields();
		}
	}, [url]);
	const uploadPic = () => {
		const data = new FormData();
		data.append("file", image);
		data.append("upload_preset", "insta-abi");
		data.append("cloud_name", "insta-07");
		fetch("https://api.cloudinary.com/v1_1/insta-07/image/upload", {
			method: "post",
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				setUrl(data.url);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const uploadFields = () => {
		if (
			!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				email
			)
		) {
			M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
			return;
		}
		fetch("/signup", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				password,
				email,
				pic: url,
				teacherId,
				teacherNumber,
				teacherDepartment,
				userType: "TEACHER",
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					M.toast({
						html: data.error,
						classes: "#c62828 red darken-3",
					});
				} else {
					M.toast({
						html: data.message,
						classes: "#43a047 green darken-1",
					});
					history.push("/signin");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const PostData = () => {
		if (image) {
			uploadPic();
		} else {
			uploadFields();
		}
	};

	return (
		<div className="mycard">
			<div className="card auth-card input-field">
				{/* <img src="/logo.jpeg" /> */}
				<h2>REC Placement Query Portal</h2>
				<input
					type="text"
					placeholder="Teacher Full Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Email Address"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPasword(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Teacher ID"
					value={teacherId}
					onChange={(e) => setTeacherId(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Department"
					value={teacherDepartment}
					onChange={(e) => setTeacherDepartment(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Teacher Number"
					value={teacherNumber}
					onChange={(e) => setTeacherNumber(e.target.value)}
				/>
				<button
					className="btn waves-effect waves-light #64b5f6 blue darken-1"
					onClick={() => PostData()}
				>
					SignUP
				</button>
				<h5>
					<Link to="/signin">Already have an account ?</Link>
				</h5>
			</div>
		</div>
	);
};

export default TeacherSignUp;
