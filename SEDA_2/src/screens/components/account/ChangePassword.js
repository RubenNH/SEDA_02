import React, { useState } from 'react';
import { Modal, TextInput, View, StyleSheet, Text, Pressable } from 'react-native';
import { Button } from 'react-native-elements';
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, updatePassword, EmailAuthProvider } from "firebase/auth";
import Toast from "react-native-toast-message";

export default function ChangePassword({ visible, onClose }) {
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        onSubmit: async (formValue) => {
            try {

                setIsLoading(true);
                const auth = getAuth();
                const user = auth.currentUser;
                if (!user) {
                    // El usuario no está autenticado
                    throw new Error("Usuario no autenticado");
                }

                // Verificar que user tenga la función reauthenticateWithCredential
                if (typeof user.reauthenticateWithCredential !== "function") {
                    throw new Error("reauthenticateWithCredential no es una función en el objeto user");
                }
                const credential = EmailAuthProvider.credential(user.email, "password");
                await user.reauthenticateWithCredential(credential);
                await updatePassword(user, formValue.newPassword);
                formik.resetForm();
                onClose();

                Toast.show({
                    type: "success",
                    position: "bottom",
                    text1: "Contraseña actualizada exitosamente",
                });
            } catch (error) {
                console.error("Mi errorrrrrr" + error);
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
        <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.overlayView}>
                    <Text style={styles.title}>Cambiar contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña actual"
                        secureTextEntry={!showCurrentPass}
                        onChangeText={formik.handleChange("currentPassword")}
                        errorMessage={formik.touched.currentPassword && formik.errors.currentPassword}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Nueva contraseña"
                        secureTextEntry={!showNewPass}
                        onChangeText={formik.handleChange("newPassword")}
                        errorMessage={formik.touched.newPassword && formik.errors.newPassword}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar nueva contraseña"
                        secureTextEntry={!showConfirmPass}
                        onChangeText={formik.handleChange("confirmPassword")}
                        errorMessage={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />

                    <View style={styles.btnGroup}>
                        <Button
                            title="Cancelar"
                            onPress={onClose}
                            buttonStyle={styles.btnCancel}
                            titleStyle={styles.btnCancelText}
                        />
                        <Button
                            title="Guardar"
                            onPress={formik.handleSubmit}
                            buttonStyle={styles.btnSave}
                            titleStyle={styles.btnSaveText}
                            loading={isLoading}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    overlayView: {
        backgroundColor: "white",
        width: "80%",
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    btnGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    btn: {
        borderRadius: 5,
        padding: 10,
        width: "45%",
    },
    btnCancel: {
        backgroundColor: "gray",
    },
    btnSubmit: {
        backgroundColor: "blue",
        color: "white",
    },
});
