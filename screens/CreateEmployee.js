/* eslint-disable no-undef */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
//import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-root-toast';
const CreateEmployee = ({navigation}) => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Salary, setSalary] = useState('');
  const [Picture, setPicture] = useState('');
  const [Position, setPosition] = useState('');
  const [modal, setModal] = useState(false);

  launchCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      //console.log(image);
      handleUpload(image);
    });
  };
  launchImageLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      //console.log(image);
      handleUpload(image);
    });
  };
  const handleUpload = async image => {
    RNFetchBlob.fetch(
      'POST',
      'https://api.cloudinary.com/v1_1/jasbir-work-dev/image/upload',
      {
        // 'Content-Type': 'multipart/form-data',
        'Content-Type': 'octet-stream',
      },
      [
        // element with property `filename` will be transformed into `file` in form data
        {name: 'file', filename: 'photo.jpg', data: image.data},
        {name: 'upload_preset', data: 'employeeapp'},
        {name: 'cloud_name', data: 'jasbir-dev-work'},
      ],
    )
      // listen to upload progress event
      .uploadProgress({interval: 10}, (written, total) => {
        console.log('uploaded', (written / total) * 100);
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setPicture(res.url);
        setModal(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  reset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPicture('');
    setSalary('');
    setPosition('');
  };
  onsubmitData = () => {
    fetch('http://a89b4aa3.ngrok.io/send-data', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: Name,
        email: Email,
        phone: Phone,
        salary: Salary,
        position: Position,
        picture: Picture,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        Alert.alert(`${res.name} is saved successfully`);
        reset();
        navigation.navigate('Home');
        Toast.show('Data Uploaded successfully !!', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      })
      .catch(err => {
        console.log(err);
        Toast.show('Oops Error Detected !!', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      });
  };

  return (
    <View>
      <KeyboardAvoidingView>
        <TextInput
          label="Name"
          style={style.inputStyle}
          value={Name}
          mode="outlined"
          theme={theme}
          onChangeText={text => setName(text)}
        />
        <TextInput
          label="Email"
          style={style.inputStyle}
          value={Email}
          mode="outlined"
          theme={theme}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          label="Phone"
          style={style.inputStyle}
          value={Phone}
          keyboardType="number-pad"
          mode="outlined"
          theme={theme}
          onChangeText={text => setPhone(text)}
        />
        <TextInput
          label="Salary"
          style={style.inputStyle}
          value={Salary}
          mode="outlined"
          theme={theme}
          onChangeText={text => setSalary(text)}
        />
        <TextInput
          label="Position"
          style={style.inputStyle}
          value={Position}
          mode="outlined"
          theme={theme}
          onChangeText={text => setPosition(text)}
        />

        <Button
          icon={Picture == '' ? 'upload' : 'check'}
          mode="contained"
          style={style.buttonStyle}
          theme={theme}
          onPress={() => setModal(true)}>
          Upload Image
        </Button>

        <Button
          icon="content-save"
          style={style.buttonStyle}
          mode="contained"
          theme={theme}
          onPress={onsubmitData}>
          Save
        </Button>
        <Modal
          animationType="slide"
          onRequestClose={() => {
            setModal(false);
          }}
          transparent={true}
          visible={modal}>
          <View style={style.modalView}>
            <View style={style.modalButtonview}>
              <Button
                icon="camera"
                mode="contained"
                theme={theme}
                onPress={launchCamera}>
                Camera
              </Button>
              <Button
                icon="image-area"
                mode="contained"
                theme={theme}
                onPress={launchImageLibrary}>
                Gallery
              </Button>
            </View>
            <Button onPress={() => setModal(false)}>Cancel</Button>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
};
const theme = {
  colors: {
    primary: '#006aff',
  },
};
const style = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputStyle: {
    margin: 5,
    height: 50,
  },
  buttonStyle: {margin: 5},
  modalView: {
    position: 'absolute',
    bottom: 2,
    width: '100%',
    backgroundColor: '#ffff',
  },
  modalButtonview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default CreateEmployee;
