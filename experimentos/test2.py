import matlab.engine
import time
import pyvisa.highlevel as hl
import numpy as np
import matplotlib.pyplot as plt

start = time.time()


actual_frecuency = 19000.0

def data_acquisition(frecuencies, generador, values_ch1, values_ch2, max_ch1, max_ch2, engine, actual_frecuency, steps, sensivity):
    
    e_sensivity = sensivity
    e_final_frecuency = actual_frecuency
    ti = 1/e_final_frecuency

        
    timee = (1 / 500000)
    for _ in range(steps):
        start_time1 = time.time()
        round_frequency = round(e_final_frecuency, 1)
        end_time1 = time.time()
        start_time2 = time.time()
        frecuencies.append(round_frequency)
        end_time2 = time.time()
        start_time3 = time.time()
        generador.write('FREQ '+ str(e_final_frecuency))
        end_time3 = time.time()
        start_time4 = time.time()
        max_val = engine.acquireData_channel_1()
        end_time4 = time.time()
        start_time5 = time.time()
        for i in max_val:
            values_ch1.append(i[0])
            values_ch2.append(i[1])
        
        end_time5 = time.time()
        start_time6 = time.time()
        max_ch1.append(np.max(values_ch1))
        end_time6 = time.time()
        start_time7 = time.time()
        max_ch2.append(np.max(values_ch2))
        end_time7 = time.time()

        # SHIFT PHASE
        

        start_time8 = time.time()
        # Calcular la correlación cruzada entre las dos señales
        cross_corr = np.correlate(values_ch1, values_ch2, mode='full')
        end_time8 = time.time()
        start_time9 = time.time()
        # Encontrar el desplazamiento de fase que maximiza la correlación
        max_corr_idx = np.argmax(cross_corr)
        end_time9 = time.time()
        start_time10 = time.time()
        shift_phase_time = (max_corr_idx - len(values_ch1) + 1) * timee
        end_time10 = time.time()
        start_time11 = time.time()
        shift_phase_value=2*np.pi*shift_phase_time/ti
        end_time11 = time.time()
        start_time12 = time.time()
        shift_phase.append(shift_phase_value)
        end_time12 = time.time()
        values_ch1.clear()
        values_ch2.clear()
        e_final_frecuency += sensivity
    
        print("Time 1: ", (end_time1 - start_time1))
        print("Time 2: ", (end_time2 - start_time2))
        print("Time 3: ", (end_time3 - start_time3))
        print("Time 4: ", (end_time4 - start_time4))
        print("Time 5: ", (end_time5 - start_time5))
        print("Time 6: ", (end_time6 - start_time6))
        print("Time 7: ", (end_time7 - start_time7))
        print("Time 8: ", (end_time8 - start_time8))
        print("Time 9: ", (end_time9 - start_time9))
        print("Time 10: ", (end_time10 - start_time10))
        print("Time 11: ", (end_time11 - start_time11))
        print("Time 12: ", (end_time12 - start_time12))

               


frecuencies = []
times = []
values_channel_1 = []
values_channel_2 = []
max_values_1 = []
max_values_2 = []
shift_phase = []

final_values = []


def crear_experimento(sensibilidad, pasos, voltaje, frecuencia_inicial):
    global final_values
    final_values.clear()
    frecuencies.clear()

    values_channel_1.clear()
    values_channel_2.clear()
    max_values_1.clear()
    max_values_2.clear()
    shift_phase.clear()
    times.clear()
    

    e_sensibilidad = float(sensibilidad)
    e_pasos = int(pasos)
    e_voltaje = float(voltaje)
    e_frecuencia_inicial = float(frecuencia_inicial)

    eng = matlab.engine.start_matlab()
    rm = hl.ResourceManager()

    generador = rm.open_resource('USB0::0x0957::0x0407::MY44017234::INSTR')

    generador.write('VOLT '+ str(e_voltaje))

    
    time.sleep(3)
    eng.initializeStream_channel_1(nargout=0)  
    time.sleep(2)
    data_acquisition(frecuencies, generador, values_channel_1, values_channel_2, max_values_1, max_values_2, eng, e_frecuencia_inicial, e_pasos, e_sensibilidad)
    final_values = [c0/c1 for c0, c1 in zip(max_values_1, max_values_2)]

    

crear_experimento(10, 30, 1, actual_frecuency)

end = time.time()
print(final_values)
print(frecuencies)

final_frecuency = frecuencies[-1]
print('Frecuencia final: ', final_frecuency)
print("Time: " , (end - start))


plt.plot(frecuencies, final_values, label="f(Z) VS Frecuencia")
plt.xlabel('Frecuencia')
plt.ylabel('f(z)')
plt.title('f(z) vs Frecuencia')
plt.legend()  
plt.grid(True)  


plt.show()




