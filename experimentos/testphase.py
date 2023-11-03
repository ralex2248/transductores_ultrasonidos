import matplotlib.pyplot as plt
import numpy as np

time = 1/500000

times = []
vars = []
vars2 = []

for i in range(10):
    vars.append(3 * np.sin(2*i + 6))
    vars2.append(2 * np.sin(4*i + 2))
    times.append(time*i)

# Calcular la correlación cruzada entre las dos señales
cross_corr = np.correlate(vars, vars2, mode='full')

# Encontrar el desplazamiento de fase que maximiza la correlación
max_corr_idx = np.argmax(cross_corr)
shift_phase = (max_corr_idx - len(vars) + 1) * time



print(cross_corr)
print(max_corr_idx)
print(shift_phase)

print(f'Diferencia de fase entre las dos señales: {shift_phase} segundos')

# Ahora puedes usar matplotlib para crear un gráfico
plt.figure(figsize=(8, 4))  # Tamaño de la figura
plt.plot(times, vars, label='Variable 1')
plt.plot(times, vars2, label='Variable 2')
plt.xlabel('Tiempo')
plt.ylabel('Valor')
plt.title('Gráfico de Variables')
plt.legend()  # Agrega una leyenda con las etiquetas de las variables
plt.grid(True)  # Activa la cuadrícula en el gráfico
plt.show()  # Muestra el gráfico
