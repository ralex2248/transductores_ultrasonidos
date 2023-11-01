import matlab.engine
import time
import pyvisa.highlevel as hl
import numpy as np
import matplotlib.pyplot as plt

start = time.time()




rm = hl.ResourceManager()

generador = rm.open_resource('USB0::0x0957::0x0407::MY44017234::INSTR')


actual_frecuency = 10000.0
frecuencies = []

values_channel_1 = []
values_channel_2 = []
max_values_1 = []
max_values_2 = []

def phase():
    pass


def data_acquisition_channel_1(actual_frecuency, steps, sensivity):
    
    e_sensivity = sensivity
    e_actual_frecuency = actual_frecuency
    e_final_frecuency = actual_frecuency
    for _ in range(steps):
        round_frequency = round(e_final_frecuency, 1)
        frecuencies.append(round_frequency)
        generador.write('FREQ '+ str(e_final_frecuency))
        max_val = eng.acquireData_channel_1()
        for i in max_val:
            values_channel_1.append(i[0])
            values_channel_2.append(i[1])
        max_values_1.append(np.max(values_channel_1))
        max_values_2.append(np.max(values_channel_2))
        e_final_frecuency += sensivity
               



def main(actual_frecuency, steps, sensivity):
    global eng

    eng =  matlab.engine.start_matlab()
    time.sleep(3)
    eng.initializeStream_channel_1(nargout=0)  
    time.sleep(2)
    data_acquisition_channel_1(actual_frecuency, steps, sensivity)



main(actual_frecuency, 10, 10)

final_values = [c0/c1 for c0, c1 in zip(max_values_1, max_values_2)]
end = time.time()
print(final_values)
print(frecuencies)

final_frecuency = frecuencies[-1]
print('Frecuencia final: ', final_frecuency)
print("Time: " , (end - start))
eng.quit()

plt.plot(frecuencies, final_values, label="f(Z) VS Frecuencia")
plt.xlabel('Frecuencia')
plt.ylabel('f(z)')
plt.title('f(z) vs Frecuencia')
plt.legend()  
plt.grid(True)  


plt.show()




