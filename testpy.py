pasos = 1000
sensibilidad = 10
freq_initial = 10000
freq_final = freq_initial

for _ in range(pasos):
    freq_final += sensibilidad
    print(freq_final)
print(freq_final)
