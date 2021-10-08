import React, { useState, useEffect } from 'react';
import {
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  CheckBox,
} from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
// eslint-disable-next-line import/no-unresolved
import { calendar } from 'images';
import { Picker } from '@react-native-community/picker';
import MultiSelect from 'react-native-multiple-select';
import { GooglePlacesInput } from 'components';

const formatDate = (selectedDate) => {
  const month =
    selectedDate.getMonth().toString().length === 1
      ? '0' + selectedDate.getMonth().toString()
      : selectedDate.getMonth().toString();
  const day =
    selectedDate.getDay().toString().length === 1
      ? '0' + selectedDate.getDay().toString()
      : selectedDate.getDay().toString();

  return selectedDate.getFullYear().toString() + month + day;
};

const CreateWalkScreen = ({ route }) => {
  const initialDate = formatDate(new Date());
  const [date, setDate] = useState(initialDate);
  const [selectedRange, setSelectedRange] = useState('');
  const [duration, setDuration] = useState('');
  const [pets, setPets] = useState(null);
  const [selectedPetsId, setSelectedPetsId] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [observation, setObservation] = useState(null);
  const [startSameHome, setStartSameHome] = useState(false);
  const [startLat, setStartLat] = useState(null);
  const [startLong, setStartLong] = useState(null);
  const [startAddress, setStartAddress] = useState(null);
  const [endSameStart, setEndSameStart] = useState(false);
  const [endLat, setEndLat] = useState(null);
  const [endLong, setEndLong] = useState(null);
  const [endAddress, setEndAddress] = useState(null);

  const [show, setShow] = useState(false);
  const { ranges, userProfile } = route.params;

  useEffect(() => {
    if (userProfile) {
      setPets(userProfile.pets);
    }
  }, [userProfile]);

  const onchange = (_event, selectedDate) => {
    try {
      if (selectedDate) {
        const formattedDate = formatDate(selectedDate);
        setDate(formattedDate);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const showTimepicker = () => {
    setShow(true);
  };

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedPetsId(selectedItems);
  };
  console.log(userProfile);
  return (
    <View style={styles.container}>
      {/* WALK_DATE */}
      <View style={styles.data}>
        <Text style={styles.dataTitle}>Elija una fecha</Text>
        <View style={styles.dateContainer}>
          <TouchableOpacity style={styles.pressable} onPress={showTimepicker}>
            <Image source={calendar} style={styles.icon} />
          </TouchableOpacity>
          <Text>2021-10-07</Text>
          {show && (
            <RNDateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onchange}
              locale="es-AR"
            />
          )}
        </View>
      </View>

      {/* RANGE_ID -- TODO: evaluar dia de la semana seleccionada en date y mostrar las franjas correspondientes */}
      <View style={styles.data}>
        <Text style={styles.dataTitle}>Elija una franja horaria</Text>
        <Picker
          style={styles.dateContainer}
          selectedValue={selectedRange}
          onValueChange={(itemValue) => setSelectedRange(itemValue)}
        >
          {Boolean(ranges.length) &&
            ranges.map((range) => (
              <Picker.Item
                label={'De ' + range.start_at + ' a ' + range.end_at}
                value={range.id}
                key={range.id}
              />
            ))}
        </Picker>
      </View>

      {/* DURATION */}
      <View style={styles.data}>
        <Text style={styles.dataTitle}>Ingrese una duración en minutos</Text>
        <TextInput
          style={[styles.dateContainer, styles.durationInput]}
          value={duration}
          onChangeText={setDuration}
          placeholder="Ej.: 90"
        />
      </View>

      {/* PET_ID -- multi selection */}
      <View style={styles.data}>
        <Text style={styles.dataTitle}>Seleccione para cual/es mascota/s</Text>
        <MultiSelect
          items={pets}
          uniqueKey="id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedPetsId}
          selectText="Seleccion mascota/s"
          searchInputPlaceholderText="Buscar por nombre..."
          onChangeInput={(text) => console.log(text)}
          displayKey="name"
          submitButtonText="Confirmar selección"
          searchInputStyle={{ padding: 10 }}
          submitButtonColor="#f4d7a3"
        />
      </View>

      {/* ADDRESS_START */}
      <View style={styles.data}>
        <Text style={styles.dataTitle}>Punto de partida</Text>
        <View style={styles.titleRow}>
          <CheckBox
            value={startSameHome}
            onValueChange={setStartSameHome}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>
            Seleccionar: &quot;{userProfile.address.description}&quot; ?
          </Text>
        </View>
        <GooglePlacesInput
          setLat={setStartLat}
          setLong={setStartLong}
          setAddress={setStartAddress}
          customStyles={placeInputStyles}
          disabled={startSameHome}
          placeholder="Seleccionar otra dirección"
        />
      </View>

      {/* ADDRESS_END */}
      <View style={styles.data}>
        <Text style={styles.dataTitle}>Punto de entrega</Text>
        <View style={styles.titleRow}>
          <CheckBox value={endSameStart} onValueChange={setEndSameStart} style={styles.checkbox} />
          <Text style={styles.checkboxLabel}>Misma dirección que punto de partida?</Text>
        </View>
        <GooglePlacesInput
          setLat={setEndLat}
          setLong={setEndLong}
          setAddress={setEndAddress}
          customStyles={placeInputStyles}
          disabled={endSameStart}
          placeholder="Seleccionar otra dirección"
        />
      </View>

      {/* COMMENTS */}
      <TextInput
        multiline
        value={observation}
        onChangeText={setObservation}
        placeholder="¿Algún comentario para agregar?"
        style={[styles.dateContainer, styles.durationInput]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontSize: 16,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
  },
  activeInput: {
    backgroundColor: '#f4d7a3',
    color: '#364C63',
  },
  disableInput: {
    borderWidth: 1,
    borderColor: '#75757566',
  },
  dateWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  data: {
    paddingVertical: 5,
  },
  dataTitle: {
    paddingBottom: 5,
    fontSize: 16,
  },
  titleRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
  dateContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  durationInput: {
    paddingVertical: 10,
  },
  pressable: {},
  icon: {
    height: 25,
    width: 25,
    margin: 12,
    resizeMode: 'contain',
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    flexWrap: 'wrap',
    flex: 1,
  },
});

const placeInputStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
  },
});

export default CreateWalkScreen;
