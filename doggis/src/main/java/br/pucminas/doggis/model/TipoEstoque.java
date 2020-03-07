package br.pucminas.doggis.model;

public enum TipoEstoque {
	ENTRADA("E"), SAIDA("S");

	public final String label;
	 
    private TipoEstoque(String label) {
        this.label = label;
    }
    
    public static TipoEstoque valueOfLabel(String label) {
        for (TipoEstoque e : values()) {
            if (e.label.equals(label)) {
                return e;
            }
        }
        return null;
    }
}
