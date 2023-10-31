import matlab.engine
import time
import pyvisa.highlevel as hl
import numpy as np
import matplotlib.pyplot as plt

start = time.time()

eng = matlab.engine.start_matlab()

rm = hl.ResourceManager()

generador = rm.open_resource('USB0::0x0957::0x0407::MY44017234::INSTR')


actual_frecuency = 15000
    
frecuencies = []

values_channel_0 = []
values_channel_1 = []


def phase():
    pass

def data_acquisition_channel_0(actual_frecuency, steps, sensivity):
    e_sensivity = sensivity
    e_actual_frecuency = actual_frecuency
    e_final_frecuency = actual_frecuency

    for _ in range(steps):
        frecuencies.append(e_final_frecuency)
        generador.write('FREQ '+ str(e_final_frecuency))
        max_val = eng.acquireData_channel_0()
        values_channel_0.append(max_val)
        e_final_frecuency += sensivity
    final_frecuency = e_final_frecuency
    

def data_acquisition_channel_1(actual_frecuency, steps, sensivity):
    e_sensivity = sensivity
    e_actual_frecuency = actual_frecuency
    e_final_frecuency = actual_frecuency
    for _ in range(steps):
        generador.write('FREQ '+ str(e_final_frecuency))
        max_val = eng.acquireData_channel_1()
        values_channel_1.append(max_val)
        e_final_frecuency += sensivity


def main(actual_frecuency, steps, sensivity):

    eng.initializeStream_channel_0(nargout=0)  
    time.sleep(2.8)
    data_acquisition_channel_0(actual_frecuency, steps, sensivity)

    eng.initializeStream_channel_1(nargout=0)  
    time.sleep(2.6)
    data_acquisition_channel_1(actual_frecuency, steps, sensivity)




main(actual_frecuency, 10, 10)


final_values = [c0/c1 for c0, c1 in zip(values_channel_0, values_channel_1)]
end = time.time()

#print("RESISTENCIA:\n")
#print(final_values)
#print("\nARRAY DE FRECUENCIAS: \n")
#print(frecuencies)
print(values_channel_0)
print(values_channel_1)
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




