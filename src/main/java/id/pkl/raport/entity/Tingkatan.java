package id.pkl.raport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tingkatan")
public class Tingkatan {
	@Id
	@GeneratedValue
	@Column(name="id")
	private Long id;
	
	@Enumerated(EnumType.STRING)
	@Column(name="tingkat")
	private Tingkat tingkat;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Tingkat getTingkat() {
		return tingkat;
	}

	public void setTingkat(Tingkat tingkat) {
		this.tingkat = tingkat;
	}	
	
}
