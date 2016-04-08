package id.pkl.raport.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Embeddable
public class TingkatKelasId implements Serializable{
	
	@Column(name="tingkat_id")
	private Long tingkatId;
	
	@Column(name="grup_id")
	private Long grupId;

	public Long getTingkatId() {
		return tingkatId;
	}

	public void setTingkatId(Long tingkatId) {
		this.tingkatId = tingkatId;
	}

	public Long getGrupId() {
		return grupId;
	}

	public void setGrupId(Long id) {
		this.grupId = id;
	}
}
