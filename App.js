import { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import axios from "axios";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let errors = {};

    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setUsername("");
      setPassword("");
      setErrors({});
      //success false to update state
      setSuccess(false);

      //submit
      setLoading(true);
      try {
        //replace your IP ADDRESS for proper running.
        await axios.post("http://192.168.104.55:5000/api/user", {
          username,
          password,
        });
        //I'm setting state success for now we can do a complex task
        //like storing

        setSuccess(true);
      } catch (error) {
        setErrors({ response: error.response.data.error });
        console.log(error.response.data.error);
      }
      setLoading(false);
      console.log(username, password);
    }
  };

  const handleLogout = () => {
    setSuccess(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      {success ? (
        <View>
          <Text style={styles.success}>Successfully logged in</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            placeholder="Enter your username"
          />
          {errors.username ? (
            <Text style={styles.errorText}>{errors.username}</Text>
          ) : null}
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Enter your password"
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
          {errors.response && (
            <Text style={styles.errorText}>{errors.response}</Text>
          )}
          {loading && <Text style={styles.loading}>Loading...</Text>}
          <Button title="Login" onPress={handleSubmit} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 20,
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 28,
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0.25,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  loading: {
    alignSelf: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  success: {
    color: "green",
    marginBottom: 30,
    fontSize: 24,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
