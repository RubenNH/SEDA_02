import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, updatePassword, EmailAuthProvider } from "firebase/auth";
import Toast from "react-native-toast-message";

export default function ChangePasswordForm() {
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                // usuario no autenticado, redirigir a la pantalla de inicio de sesión
            }
        });

        return unsubscribe;
    }, []);
    const auth = getAuth(); // Declaración del objeto auth
    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string().required("La contraseña actual es obligatoria"),
            newPassword: Yup.string()
                .min(6, "La nueva contraseña debe tener al menos 6 caracteres")
                .required("La nueva contraseña es obligatoria"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword"), null], "Las contraseñas deben coincidir")
                .required("La confirmación de la contraseña es obligatoria"),
        }),
        onSubmit: async (formValues) => {

            try {
                setIsLoading(true);
                const user = auth.currentUser;
                console.log(auth.currentUser.email);
                console.log(auth.currentUser.displayName);
            

                const credential = EmailAuthProvider.credential(user.email, formValues.currentPassword);

                await user.reauthenticateWithCredential(credential);
                await updatePassword(user, formValues.newPassword);

                formik.resetForm();

                Toast.show({
                    type: "success",
                    position: "bottom",
                    text1: "Contraseña actualizada exitosamente",
                });
            } catch (error) {
                console.log(auth.currentUser.displayName);
                console.error(error);
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Ha ocurrido un error al actualizar la contraseña",
                });
            } finally {
                setIsLoading(false);
            }
        },
    });


    const showHidePassword = (field) => {
        switch (field) {
            case "current":
                setShowCurrentPass(!showCurrentPass);
                break;
            case "new":
                setShowNewPass(!showNewPass);
                break;
            case "confirm":
                setShowConfirmPass(!showConfirmPass);
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.viewContent}>
            <Input
                containerStyle={styles.input}
                placeholder="Contraseña actual"
                secureTextEntry={!showCurrentPass}
                rightIcon={{
                    type: "material-community",
                    name: showCurrentPass ? "eye-off-outline" : "eye-outline",
                    iconStyle: styles.icon,
                    onPress: () => showHidePassword("current"),
                }}
                onChangeText={formik.handleChange("currentPassword")}
                errorMessage={formik.touched.currentPassword && formik.errors.currentPassword}
            />

            <Input
                containerStyle={styles.input}
                placeholder="Nueva contraseña"
                secureTextEntry={!showNewPass}
                rightIcon={{
                    type: "material-community",
                    name: showNewPass ? "eye-off-outline" : "eye-outline",
                    iconStyle: styles.icon,
                    onPress: () => showHidePassword("new"),
                }}
                onChangeText={formik.handleChange("newPassword")}
                errorMessage={formik.touched.newPassword && formik.errors.newPassword}
            />

            <Input
                containerStyle={styles.input}
                placeholder="Confirmar nueva contraseña"
                secureTextEntry={!showConfirmPass}
                rightIcon={{
                    type: "material-community",
                    name: showConfirmPass ? "eye-off-outline" : "eye-outline",
                    iconStyle: styles.icon,
                    onPress: () => showHidePassword("confirm"),
                }}
                onChangeText={formik.handleChange("confirmPassword")}
                errorMessage={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />

            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                onPress={formik.handleSubmit}
                loading={isLoading}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    viewContent: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
    icon: {
        color: "#c1c1c1",
    },
    button: {
        backgroundColor: "#00a680",
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        width: "95%",
    },
    buttonText: {
        color: "#fff",
    },
    overlay: {
        height: "auto",
        width: "90%",
        backgroundColor: "#fff",
    },
    overlayView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});


